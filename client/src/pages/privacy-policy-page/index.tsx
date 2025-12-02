import React, { useMemo } from 'react';

export const PrivacyPolicyPage: React.FC = () => {
    
    const styleDefinitions = useMemo(() => ({
        titleStyle: { 
            color: '#5a0000', 
            borderBottom: '3px solid #5a0000', 
            paddingBottom: '10px', 
            marginBottom: '30px', 
            fontSize: '2.2em', 
            textAlign: 'center',
        } as React.CSSProperties,

        h2Style: { 
            color: '#5a0000', 
            borderLeft: '4px solid #5a0000', 
            paddingLeft: '15px', 
            marginTop: '30px', 
            marginBottom: '15px', 
            fontSize: '1.4em',
        } as React.CSSProperties,

        h3Style: { 
            color: '#333', 
            marginTop: '20px', 
            marginBottom: '10px', 
            fontSize: '1.2em',
        } as React.CSSProperties,

        infoBoxStyle: { 
            background: '#f8f8f8', 
            padding: '20px', 
            borderRadius: '5px', 
            border: '1px solid #ddd', 
            margin: '20px 0',
        } as React.CSSProperties,

        highlightStyle: { 
            background: '#fff3cd', 
            padding: '15px', 
            borderLeft: '4px solid #ffc107', 
            margin: '20px 0', 
            borderRadius: '4px',
        } as React.CSSProperties,

        contactBoxStyle: { 
            background: '#e8f4f8', 
            border: '1px solid #bee5eb', 
            padding: '20px', 
            borderRadius: '5px', 
            margin: '20px 0',
        } as React.CSSProperties,

        pStyle: { 
            marginBottom: '12px', 
            textAlign: 'justify',
        } as React.CSSProperties,

        ulStyle: { 
            marginLeft: '20px', 
            marginBottom: '15px', 
            listStyleType: 'disc',
        } as React.CSSProperties,

        liStyle: { 
            marginBottom: '5px',
        } as React.CSSProperties,

    }), []);

    const { 
        titleStyle, h2Style, h3Style, infoBoxStyle, highlightStyle, 
        contactBoxStyle, pStyle, ulStyle, liStyle 
    } = styleDefinitions;


    return (
        <div className="container mx-auto px-4 pt-5"> 
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                
                <h1 style={titleStyle}>POLÍTICA DE PRIVACIDADE</h1> 

                <p className="date-updated text-center" style={{fontStyle: 'italic', color: '#666', marginBottom: '30px'}}>
                    <strong>Última atualização: 05 de Julho de 2025</strong>
                </p>

                <h2 style={h2Style}>1. IDENTIFICAÇÃO DA EMPRESA</h2>
                <div style={infoBoxStyle}>
                    <p style={pStyle}><strong>Tabula Tecnologia Ltda.</strong></p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>CNPJ: 00.623.904/0001-73</li>
                        <li style={liStyle}>Endereço: Rua Ernesto Beuter, 53</li>
                        <li style={liStyle}>CEP: 123.45678-50</li>
                        <li style={liStyle}>Email: tabula.email@tabulairos.com</li>
                        <li style={liStyle}>Telefone: +55 (99) 99999-9999</li>
                    </ul>
                </div>

                <h2 style={h2Style}>2. SOBRE ESTA POLÍTICA</h2>
                <p style={pStyle}>Esta Política de Privacidade visa esclarecer como a Tabula coleta, usa, armazena e protege as informações pessoais dos usuários de nossos serviços, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>

                <h2 style={h2Style}>3. INFORMAÇÕES QUE COLETAMOS</h2>
                
                <h3 style={h3Style}>3.1 Dados Pessoais Fornecidos Diretamente</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Nome Completo</li>
                    <li style={liStyle}>E-mail</li>
                    <li style={liStyle}>Telefone</li>
                    <li style={liStyle}>CPF/CNPJ</li>
                    <li style={liStyle}>Endereço</li>
                    <li style={liStyle}>Data de nascimento</li>
                    <li style={liStyle}>Informações de pagamento</li>
                </ul>

                <h3 style={h3Style}>3.2 Dados Coletados Automaticamente</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Endereço IP</li>
                    <li style={liStyle}>Informações do navegador</li>
                    <li style={liStyle}>Cookies e tecnologias similares</li>
                    <li style={liStyle}>Dados de localização</li>
                    <li style={liStyle}>Histórico de navegação no site</li>
                </ul>

                <h3 style={h3Style}>3.3 Dados de Terceiros</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Informações obtidas através de mídias sociais (quando autorizado)</li>
                    <li style={liStyle}>Dados de parceiros comerciais</li>
                    <li style={liStyle}>Informações de agências de crédito</li>
                </ul>

                <h2 style={h2Style}>4. FINALIDADE DO PROCESSAMENTO</h2>
                <p style={pStyle}>Utilizamos seus dados pessoais para:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Prestação dos serviços contratados</li>
                    <li style={liStyle}>Comunicação com o usuário</li>
                    <li style={liStyle}>Processamento de pagamentos</li>
                    <li style={liStyle}>Cumprimento de obrigações legais</li>
                    <li style={liStyle}>Análise estatística e melhoria dos serviços</li>
                    <li style={liStyle}>Marketing e publicidade (quando consentido)</li>
                    <li style={liStyle}>Prevenção de fraudes</li>
                    <li style={liStyle}>Atendimento ao cliente</li>
                </ul>

                <h2 style={h2Style}>5. BASE LEGAL PARA O PROCESSAMENTO</h2>
                <p style={pStyle}>O processamento de seus dados pessoais baseia-se nos seguintes fundamentos legais:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Consentimento do titular dos dados</li>
                    <li style={liStyle}>Execução de contrato</li>
                    <li style={liStyle}>Cumprimento de obrigação legal</li>
                    <li style={liStyle}>Legítimo interesse</li>
                    <li style={liStyle}>Proteção da vida</li>
                    <li style={liStyle}>Exercício regular de direitos</li>
                </ul>

                <h2 style={h2Style}>6. COMPARTILHAMENTO DE DADOS</h2>
                <p style={pStyle}>Seus dados podem ser compartilhados com:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Prestadores de serviços e parceiros</li>
                    <li style={liStyle}>Autoridades competentes (quando exigido por lei)</li>
                    <li style={liStyle}>Empresas do grupo Tabula</li>
                    <li style={liStyle}>Processadores de pagamento</li>
                    <li style={liStyle}>Empresas de análise e marketing (dados anonimizados)</li>
                </ul>
                
                <div style={highlightStyle}>
                    <p style={pStyle}><strong>Importante:</strong> Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins não relacionados aos nossos serviços.</p>
                </div>

                <h2 style={h2Style}>7. ARMAZENAMENTO E SEGURANÇA</h2>
                
                <h3 style={h3Style}>7.1 Período de Retenção</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Dados de cadastro: enquanto a conta estiver ativa</li>
                    <li style={liStyle}>Dados de transação: 5 anos após a última transação</li>
                    <li style={liStyle}>Dados de marketing: até a retirada do consentimento</li>
                    <li style={liStyle}>Dados para conformidade legal: conforme exigido por lei</li>
                </ul>

                <h3 style={h3Style}>7.2 Medidas de Segurança</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Criptografia de dados sensíveis</li>
                    <li style={liStyle}>Controle de acesso restrito</li>
                    <li style={liStyle}>Monitoramento de segurança 24/7</li>
                    <li style={liStyle}>Backup testado regularmente</li>
                    <li style={liStyle}>Treinamento da equipe em proteção de dados</li>
                </ul>

                <h2 style={h2Style}>8. SEUS DIREITOS</h2>
                <p style={pStyle}>Você tem os seguintes direitos sobre seus dados pessoais:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}><strong>Acesso:</strong> saber quais dados mantemos sobre você</li>
                    <li style={liStyle}><strong>Retificação:</strong> corrigir dados incompletos ou incorretos</li>
                    <li style={liStyle}><strong>Exclusão:</strong> solicitar a remoção de seus dados</li>
                    <li style={liStyle}><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
                    <li style={liStyle}><strong>Oposição:</strong> opor-se ao processamento de seus dados</li>
                    <li style={liStyle}><strong>Limitação:</strong> restringir o processamento de seus dados</li>
                    <li style={liStyle}><strong>Revogação:</strong> retirar o consentimento a qualquer momento</li>
                </ul>

                <h2 style={h2Style}>9. COOKIES E TECNOLOGIAS SIMILARES</h2>
                <p style={pStyle}>Utilizamos cookies para:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Melhorar a experiência do usuário</li>
                    <li style={liStyle}>Analisar o tráfego do site</li>
                    <li style={liStyle}>Personalizar conteúdo</li>
                    <li style={liStyle}>Facilitar o processo de login</li>
                </ul>
                <p style={pStyle}>Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.</p>

                <h2 style={h2Style}>10. TRANSFERÊNCIA INTERNACIONAL</h2>
                <p style={pStyle}>Alguns de nossos prestadores de serviços podem estar localizados fora do Brasil. Garantimos que essas transferências ocorram apenas para países com nível adequado de proteção de dados ou mediante salvaguardas apropriadas.</p>

                <h2 style={h2Style}>11. MENORES DE IDADE</h2>
                <p style={pStyle}>Não coletamos intencionalmente dados de menores de 18 anos sem o consentimento dos pais ou responsáveis. Se tomarmos conhecimento de que coletamos dados de menores sem autorização, tomaremos medidas para removê-los.</p>

                <h2 style={h2Style}>12. ALTERAÇÕES NESTA POLÍTICA</h2>
                <p style={pStyle}>Esta política pode ser atualizada periodicamente. Notificaremos você sobre alterações significativas através de:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>E-mail para usuários cadastrados</li>
                    <li style={liStyle}>Aviso em nosso site</li>
                    <li style={liStyle}>Notificação em nosso aplicativo</li>
                </ul>

                <h2 style={h2Style}>13. CANAL DE COMUNICAÇÃO</h2>
                <p style={pStyle}>Para exercer seus direitos, esclarecer dúvidas ou relatar incidentes de proteção de dados, entre em contato conosco:</p>
                
                <div style={contactBoxStyle}>
                    <p style={pStyle}><strong>Encarregado de Proteção de Dados (DPO):</strong></p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>Email: tabula.email@tabulairos.com</li>
                        <li style={liStyle}>Telefone: +55 (99) 99999-9999</li>
                        <li style={liStyle}>Endereço: Rua Ernesto Beuter, 53 - CEP: 123.45678-50</li>
                    </ul>
                    <p style={pStyle}><strong>Prazo de resposta:</strong> até 15 dias úteis</p>
                </div>

                <h2 style={h2Style}>14. AUTORIDADE SUPERVISORA</h2>
                <p style={pStyle}>Em caso de não resolução de conflitos, você pode contatar a Autoridade Nacional de Proteção de Dados (ANPD):</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Site: www.gov.br/anpd</li>
                    <li style={liStyle}>Email: comunicacao@anpd.gov.br</li>
                </ul>

                <h2 style={h2Style}>15. DISPOSIÇÕES GERAIS</h2>
                <p style={pStyle}>Esta política é regida pelas leis brasileiras, especialmente a LGPD. Quaisquer disputas serão resolvidas no foro de nossa sede.</p>
                <p style={pStyle}><strong>Data de vigência:</strong> Esta política entra em vigor na data de sua publicação e permanece válida indefinidamente.</p>

                <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #5a0000'}}>
                    <p style={pStyle}>Tabula Tecnologia Ltda.</p>
                    <p style={pStyle}>CNPJ: 00.623.904/0001-73</p>
                </div>
            </div>
        </div>
    );
};