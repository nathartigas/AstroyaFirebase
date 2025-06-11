
'use server';

import nodemailer from 'nodemailer';
import type { ConsultationFormValues } from '@/components/feature/consultation-modal';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export async function sendConsultationEmailAction(data: ConsultationFormValues) {
  const {
    companyName,
    clientEmail, // Added clientEmail
    companyWebsite,
    mainChallenge,
    targetAudience,
    serviceLandingPage,
    serviceSEO,
    serviceMaintenance,
    preferredDate,
    preferredTime,
  } = data;

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
        rejectUnauthorized: process.env.NODE_ENV === 'production' 
    }
  });

  const formattedDate = format(preferredDate, "PPP", { locale: ptBR });
  const servicesList = [
    serviceLandingPage && "Criação de Landing Pages de Alta Conversão",
    serviceSEO && "Otimização SEO para Melhor Visibilidade",
    serviceMaintenance && "Manutenção Contínua e Suporte Técnico",
  ].filter(Boolean);
  
  const servicesText = servicesList.length > 0 ? servicesList.join(', ') : 'Nenhum serviço específico selecionado';

  // Email para o Administrador/Empresa
  const adminMailOptions = {
    from: `"Astroya Agendamentos" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER}>`,
    to: process.env.EMAIL_TO_ADDRESS,
    subject: `Nova Solicitação de Consultoria Astroya: ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #FF5500; border-bottom: 2px solid #9200BE; padding-bottom: 10px;">Nova Solicitação de Consultoria Recebida</h2>
            <p>Uma nova solicitação de consultoria foi feita através do site Astroya.</p>
            
            <h3 style="color: #8A2BE2; margin-top: 25px;">Detalhes da Solicitação:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Empresa:</strong> ${companyName}</li>
              <li style="margin-bottom: 8px;"><strong>E-mail do Solicitante:</strong> ${clientEmail}</li>
              <li style="margin-bottom: 8px;"><strong>Website:</strong> ${companyWebsite ? `<a href="${companyWebsite}" style="color: #FF5500;">${companyWebsite}</a>` : 'Não informado'}</li>
              <li style="margin-bottom: 8px;"><strong>Principal Desafio/Objetivo:</strong> ${mainChallenge}</li>
              <li style="margin-bottom: 8px;"><strong>Público-Alvo:</strong> ${targetAudience}</li>
              <li style="margin-bottom: 8px;"><strong>Serviços de Interesse:</strong> ${servicesText}</li>
              <li style="margin-bottom: 8px;"><strong>Data e Horário Preferidos:</strong> ${formattedDate} às ${preferredTime}</li>
            </ul>
            
            <p style="margin-top: 25px;"><strong>Próximos Passos:</strong></p>
            <p>Por favor, entre em contato com o solicitante através do e-mail <a href="mailto:${clientEmail}" style="color: #FF5500;">${clientEmail}</a> para confirmar o agendamento e alinhar os detalhes da consultoria.</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #777;">Este é um e-mail automático enviado pelo sistema de agendamento da Astroya.</p>
        </div>
      </div>
    `,
  };

  // Email de Confirmação para o Cliente
  const clientMailOptions = {
    from: `"Astroya" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER}>`,
    to: clientEmail,
    subject: `Confirmação de Solicitação de Consultoria - Astroya`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #FF5500; border-bottom: 2px solid #9200BE; padding-bottom: 10px;">Olá ${companyName.split(' ')[0]}, sua solicitação foi recebida!</h2>
            <p>Obrigado por entrar em contato com a Astroya e solicitar uma consultoria estratégica gratuita.</p>
            <p>Recebemos seus dados e entraremos em contato em breve para confirmar o agendamento e discutir os próximos passos.</p>
            
            <h3 style="color: #8A2BE2; margin-top: 25px;">Detalhes da sua Solicitação:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Empresa:</strong> ${companyName}</li>
              ${companyWebsite ? `<li style="margin-bottom: 8px;"><strong>Website:</strong> ${companyWebsite}</li>` : ''}
              <li style="margin-bottom: 8px;"><strong>Data e Horário Solicitados:</strong> ${formattedDate} às ${preferredTime}</li>
              <li style="margin-bottom: 8px;"><strong>Serviços de Interesse:</strong> ${servicesText}</li>
            </ul>
            
            <p style="margin-top: 25px;"><strong>O que acontece agora?</strong></p>
            <p>Nossa equipe analisará sua solicitação e entrará em contato com você pelo e-mail <strong>${clientEmail}</strong> para confirmar o horário e prepará-lo para nossa conversa.</p>
            <p>Enquanto isso, sinta-se à vontade para explorar mais sobre nossos serviços em nosso site.</p>
            
            <p style="margin-top: 25px;">Atenciosamente,</p>
            <p style="font-weight: bold; color: #FF5500;">Equipe Astroya</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #777;">Este é um e-mail de confirmação automático. Se você não solicitou esta consultoria, por favor, ignore este e-mail.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    // Só envia email para o cliente se o email para o admin foi bem sucedido
    await transporter.sendMail(clientMailOptions); 
    return { success: true, message: 'Sua solicitação foi enviada! Enviamos um e-mail de confirmação para você.' };
  } catch (error) {
    console.error("Falha ao enviar e-mail de consultoria:", error);
    // Verificar se o erro foi no e-mail do cliente ou do admin para uma mensagem mais específica, se necessário
    return { success: false, message: 'Houve um problema ao enviar sua solicitação. Por favor, tente novamente ou entre em contato diretamente.' };
  }
}

    