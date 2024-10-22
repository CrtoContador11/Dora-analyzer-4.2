import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { FormDataType, Question, Category } from '../types';
import { generateChartData, chartOptions } from '../utils/chartUtils';
import { Chart } from 'chart.js/auto';

const TELEGRAM_BOT_TOKEN = '7979728776:AAF37aFpjmflfHrW0ykXbbIUTcd57X1X-rc';
const TELEGRAM_CHAT_ID = '763968348';

export const generateAndSendPDF = async (
  formData: FormDataType,
  questions: Question[],
  categories: Category[],
  language: 'es' | 'pt'
): Promise<boolean> => {
  try {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Informe DORA', 105, 15, { align: 'center' });
    
    // Form details in the same order as questionnaire starter
    doc.setFontSize(12);
    doc.text(`${language === 'es' ? 'Entidad Financiera' : 'Entidade Financeira'}: ${formData.financialEntityName}`, 20, 30);
    doc.text(`${language === 'es' ? 'Departamento' : 'Torre de Serviços'}: ${formData.providerName}`, 20, 40);
    doc.text(`${language === 'es' ? 'Usuario' : 'Usuário'}: ${formData.userName}`, 20, 50);
    doc.text(`${language === 'es' ? 'Fecha' : 'Data'}: ${new Date(formData.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'pt-BR')}`, 20, 60);

    // Generate chart
    try {
      const chartData = generateChartData(formData, questions, categories, language);
      const options = chartOptions(language);

      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: options
        });

        const chartImage = canvas.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', 15, 70, 180, 100);
      }
    } catch (chartError) {
      console.warn("Error generating chart. Skipping chart in PDF:", chartError);
      doc.text("Error al generar el gráfico", 15, 70);
    }

    // Questions and Answers
    doc.addPage();
    const tableData = questions.map((q) => [
      q.text[language]
        .replace('{providerName}', formData.providerName)
        .replace('{financialEntityName}', formData.financialEntityName),
      q.options.find((opt) => opt.value === formData.answers[q.id])?.text[language] || '',
      formData.observations[q.id] || ''
    ]);

    doc.autoTable({
      head: [[
        language === 'es' ? 'Pregunta' : 'Pergunta', 
        language === 'es' ? 'Respuesta' : 'Resposta', 
        language === 'es' ? 'Observaciones' : 'Observações'
      ]],
      body: tableData,
      startY: 10,
      styles: { overflow: 'linebreak', cellWidth: 'wrap' },
      columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 50 }, 2: { cellWidth: 60 } }
    });

    const pdfArrayBuffer = doc.output('arraybuffer');

    // Prepare message with fields in the same order
    const message = `Nuevo informe DORA:
${language === 'es' ? 'Entidad Financiera' : 'Entidade Financeira'}: ${formData.financialEntityName}
${language === 'es' ? 'Departamento' : 'Torre de Serviços'}: ${formData.providerName}
${language === 'es' ? 'Usuario' : 'Usuário'}: ${formData.userName}
${language === 'es' ? 'Fecha' : 'Data'}: ${new Date(formData.date).toLocaleDateString()}`;
    
    const messageResponse = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    const formDataForTelegram = new FormData();
    formDataForTelegram.append('chat_id', TELEGRAM_CHAT_ID);
    formDataForTelegram.append('document', new Blob([pdfArrayBuffer], { type: 'application/pdf' }), 'informe_dora.pdf');

    const pdfResponse = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formDataForTelegram, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return true;
  } catch (error) {
    console.error('Error al generar o enviar PDF a Telegram:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    return false;
  }
};