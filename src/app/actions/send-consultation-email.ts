
'use server';

import nodemailer from 'nodemailer';
import type { ConsultationFormValues } from '@/components/feature/consultation-modal';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export async function sendConsultationEmailAction(data: ConsultationFormValues) {
  const {
    companyName,
    companyWebsite,
    mainChallenge,
    targetAudience,
    serviceLandingPage,
    serviceSEO,
    serviceMaintenance,
    preferredDate,
    preferredTime,
  } = data;

  // IMPORTANT: Configure as seguintes variáveis de ambiente no seu projeto (ex: .env.local)
  // EMAIL_SERVER_HOST=smtp.example.com
  // EMAIL_SERVER_PORT=587
  // EMAIL_SERVER_SECURE=false (true para porta 465, false para outras)
  // EMAIL_SERVER_USER=seu_email@example.com
  // EMAIL_SERVER_PASSWORD=sua_senha_email
  // EMAIL_TO_ADDRESS=email_destino@example.com (para quem o e-mail será enviado)
  // EMAIL_FROM_ADDRESS=noreply@example.com (opcional, senão usará EMAIL_SERVER_USER)

  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD || !process.env.EMAIL_TO_ADDRESS || !process.env.EMAIL_SERVER_HOST) {
    console.error("Variáveis de ambiente para envio de e-mail não configuradas.");
    return { success: false, message: 'Serviço de e-mail não configurado no servidor. Contate o administrador.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
        // não falha em certificados autoassinados
        rejectUnauthorized: process.env.NODE_ENV === 'production' 
    }
  });

  const formattedDate = format(preferredDate, "PPP 'às' HH:mm", { locale: ptBR });
  const services = [
    serviceLandingPage && "Criação de Landing Pages de Alta Conversão",
    serviceSEO && "Otimização SEO para Melhor Visibilidade",
    serviceMaintenance && "Manutenção Contínua e Suporte Técnico",
  ].filter(Boolean).join(', ') || 'Nenhum serviço específico selecionado';

  const mailOptions = {
    from: `"Astroya Agendamentos" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER}>`,
    to: process.env.EMAIL_TO_ADDRESS,
    subject: `Nova Solicitação de Consultoria Astroya: ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #FF5500;">Nova Solicitação de Consultoria Recebida</h2>
        <p>Uma nova solicitação de consultoria foi feita através do site Astroya.</p>
        
        <h3 style="color: #8A2BE2;">Detalhes da Solicitação:</h3>
        <ul>
          <li><strong>Empresa:</strong> ${companyName}</li>
          <li><strong>Website:</strong> ${companyWebsite ? `<a href="${companyWebsite}">${companyWebsite}</a>` : 'Não informado'}</li>
          <li><strong>Principal Desafio/Objetivo:</strong> ${mainChallenge}</li>
          <li><strong>Público-Alvo:</strong> ${targetAudience}</li>
          <li><strong>Serviços de Interesse:</strong> ${services}</li>
          <li><strong>Data e Horário Preferidos:</strong> ${formattedDate} às ${preferredTime}</li>
        </ul>
        
        <p><strong>Próximos Passos:</strong></p>
        <p>Por favor, entre em contato com o solicitante para confirmar o agendamento e alinhar os detalhes da consultoria.</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.9em; color: #777;">Este é um e-mail automático enviado pelo sistema de agendamento da Astroya.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Sua solicitação foi enviada! Entraremos em contato em breve para confirmar.' };
  } catch (error) {
    console.error("Falha ao enviar e-mail de consultoria:", error);
    // Não exponha detalhes do erro ao cliente por segurança
    return { success: false, message: 'Houve um problema ao enviar sua solicitação. Por favor, tente novamente ou entre em contato diretamente.' };
  }
}
