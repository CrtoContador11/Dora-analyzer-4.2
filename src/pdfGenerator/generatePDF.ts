import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormDataType, Question, Category } from '../types';

export const generatePDF = (
  selectedForm: FormDataType,
  questions: Question[],
  categories: Category[],
  language: 'es' | 'pt',
  chartImage: string
) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Informe DORA', 105, 15, { align: 'center' });
  
  // Form details in the same order as questionnaire starter
  doc.setFontSize(12);
  doc.text(`${language === 'es' ? 'Entidad Financiera' : 'Entidade Financeira'}: ${selectedForm.financialEntityName}`, 20, 30);
  doc.text(`${language === 'es' ? 'Departamento' : 'Torre de Serviços'}: ${selectedForm.providerName}`, 20, 40);
  doc.text(`${language === 'es' ? 'Usuario' : 'Usuário'}: ${selectedForm.userName}`, 20, 50);
  doc.text(`${language === 'es' ? 'Fecha' : 'Data'}: ${new Date(selectedForm.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'pt-BR')}`, 20, 60);

  // Chart
  if (chartImage) {
    doc.addImage(chartImage, 'PNG', 15, 70, 180, 100);
  }

  // Questions and Answers
  doc.addPage();
  const tableData = questions.map((q) => [
    q.text[language]
      .replace('{providerName}', selectedForm.providerName)
      .replace('{financialEntityName}', selectedForm.financialEntityName),
    q.options.find((opt) => opt.value === selectedForm.answers[q.id])?.text[language] || '',
    selectedForm.observations[q.id] || ''
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

  return doc;
};