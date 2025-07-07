## Documentação Arquitetônica

### Visão Inicial Pré-Modelagem de Ameaças

#### Descrição Geral do Sistema

O projeto "AI Agents Tool" é um sistema distribuído projetado para auxiliar pessoas com doenças que causam degeneração cerebral. Ele opera capturando imagens do dia a dia do usuário através de um dispositivo, processando essas imagens com múltiplas IAs e gerando relatórios sumarizados das atividades e localizações. O objetivo é fornecer um registro visual e contextualizado das experiências diárias do usuário, ajudando a mitigar os desafios da perda de memória.

#### Componentes Principais

O sistema é composto por vários microserviços, cada um com uma função específica, e um frontend para interação do usuário. Os principais componentes identificados são:

1.  **Frontend (React Native)**: Aplicação móvel que interage com o dispositivo de captura de imagens e serve como interface para o usuário visualizar os relatórios.
2.  **Image Categorizer (Express.js + TypeScript)**: Serviço responsável por receber as imagens capturadas, processá-las para extrair tags e categorias usando uma IA , e também extrair dados EXIF, incluindo coordenadas GPS e timestamp.
3.  **Geocoding Service (Express.js + TypeScript)**: Serviço que recebe coordenadas geográficas e as converte em informações de localização legíveis por humanos (endereços, pontos de interesse, etc.).
4.  **Summarizer Service (Express.js + TypeScript)**: Serviço que recebe os dados processados (tags, categorias, localizações, timestamps) e utiliza uma IA para sumarizar as informações, gerando um relatório diário para o usuário.
5.  **PM2**: Gerenciador de processos para Node.js, utilizado para orquestrar e manter os microserviços Node.js online.

#### Fluxo de Dados (Visão de Alto Nível)

1.  O dispositivo de captura envia imagens para o **Frontend**.
2.  O **Frontend** envia as imagens para o **Image Categorizer**.
3.  O **Image Categorizer** processa a imagem:
    *   Extrai tags e categorias usando a API Imagga.
    *   Extrai dados EXIF (incluindo GPS) da imagem.
    *   Envia as coordenadas GPS para o **Geocoding Service**.
4.  O **Geocoding Service** retorna informações de localização.
5.  O **Image Categorizer** (ou um componente intermediário) agrega os dados (tags, categorias, localização, timestamp) e os envia para o **Summarizer Service**.
6.  O **Summarizer Service** gera um relatório sumarizado.
7.  O **Frontend** exibe o relatório para o usuário.

#### Considerações de Segurança (Pré-Modelagem)

Nesta fase inicial, as considerações de segurança são baseadas em uma análise superficial do sistema. As principais preocupações incluem:

*   **Privacidade dos Dados**: As imagens e informações de localização são altamente sensíveis. É crucial garantir que esses dados sejam protegidos contra acesso não autorizado.
*   **Integridade dos Dados**: As informações processadas pelas IAs devem ser precisas e não adulteradas.
*   **Disponibilidade**: O sistema deve estar sempre disponível para o usuário, dada a sua importância para pessoas com degeneração cerebral.
*   **Autenticação e Autorização**: Como o sistema garante que apenas usuários autorizados podem acessar seus próprios dados?
*   **Segurança da API**: As APIs expostas pelos microserviços precisam ser protegidas contra ataques como injeção, XSS, etc.
*   **Segurança da Comunicação**: A comunicação entre os microserviços e com serviços externos (Imagga, Geocoding) deve ser criptografada.
*   **Segurança da Orquestração**: As configurações do PM2 devem ser seguras para evitar vulnerabilidades.

#### Pontos de Vulnerabilidade Potenciais (Pré-Modelagem)

*   **Dispositivo de Captura**: Como as imagens são transferidas do dispositivo para o frontend? Há criptografia?
*   **Frontend**: Vulnerabilidades em aplicações móveis (armazenamento local de dados, comunicação insegura).
*   **APIs dos Microserviços**: Falta de autenticação/autorização, validação de entrada inadequada, exposição de informações sensíveis.
*   **Comunicação Inter-serviços**: Se a comunicação interna não for criptografada, pode haver interceptação de dados.
*   **Serviços Externos (Imagga, Geocoding)**: Dependência de APIs de terceiros e a segurança dessas APIs.
*   **Armazenamento de Dados**: Onde e como os dados (imagens, relatórios) são armazenados? Há criptografia em repouso?
*   **PM2**: Configurações de segurança do processo, gerenciamento de logs e reinicialização.

Esta visão inicial serve como base para a próxima etapa de modelagem de ameaças, onde essas preocupações serão aprofundadas e medidas de mitigação serão propostas. 

### Visão Final Após Implementação das Medidas de Mitigação

Após a modelagem de ameaças e a identificação de vulnerabilidades, as seguintes medidas de mitigação são propostas para fortalecer a segurança e a robustez do sistema:

#### Medidas de Mitigação Propostas

1.  **Autenticação e Autorização Robusta**: Implementar um sistema de autenticação baseado em tokens (e.g., JWT) para todas as APIs. Cada requisição deve ser autenticada e autorizada para garantir que apenas usuários legítimos acessem seus próprios dados. O frontend deve gerenciar o ciclo de vida dos tokens de forma segura.

2.  **Comunicação Segura (HTTPS/TLS)**: Todas as comunicações entre o frontend e os microserviços, e entre os próprios microserviços, devem ser criptografadas usando HTTPS/TLS. Isso inclui a comunicação com serviços externos como Imagga e o serviço de geocodificação. Certificados SSL/TLS devem ser gerenciados de forma adequada.

3.  **Validação de Entrada e Sanitização**: Implementar validação rigorosa de todas as entradas de dados em todos os microserviços para prevenir ataques como injeção de código, XSS e outras vulnerabilidades baseadas em entrada. Sanitizar dados antes de processá-los ou armazená-los.

4.  **Armazenamento Seguro de Dados**: As imagens e os relatórios gerados, que contêm informações sensíveis, devem ser armazenados em um banco de dados seguro e criptografado em repouso. O acesso a esse banco de dados deve ser restrito e auditado. Considerar o uso de soluções de armazenamento de objetos com criptografia (e.g., S3 com SSE).

5.  **Gerenciamento de Segredos**: Credenciais de API (Imagga, serviços de geocodificação), chaves de banco de dados e outras informações sensíveis devem ser armazenadas de forma segura (e.g., variáveis de ambiente, gerenciadores de segredos) e injetadas nos processos de forma segura, evitando hardcoding em arquivos de configuração ou código-fonte.

6.  **Monitoramento e Auditoria**: Implementar logging abrangente e monitoramento de segurança em todos os componentes do sistema. Isso inclui logs de acesso, logs de erros e métricas de desempenho. Ferramentas de SIEM (Security Information and Event Management) podem ser utilizadas para analisar esses logs e detectar atividades suspeitas.

7.  **Rate Limiting e Proteção contra DDoS**: Implementar rate limiting nas APIs para prevenir ataques de força bruta e negação de serviço (DDoS). Isso pode ser feito diretamente nos microserviços.

8.  **Segurança do Contêiner**: Utilizar imagens Docker mínimas e verificadas. Realizar varreduras de segurança nas imagens Docker para identificar vulnerabilidades conhecidas. Implementar políticas de segurança de contêineres (e.g., AppArmor, Seccomp) para restringir as capacidades dos contêineres.

9.  **Configuração Segura do PM2**: Revisar e aplicar as melhores práticas de segurança para o PM2, incluindo o uso de usuários com privilégios mínimos para executar os processos, gerenciamento adequado de logs e configuração de reinicialização segura.

10. **Tratamento de Erros Detalhado, mas Não Exposto**: As mensagens de erro devem ser detalhadas o suficiente para depuração interna, mas não devem expor informações sensíveis ao usuário final ou a atacantes.

#### Justificativa das Medidas de Mitigação

As medidas propostas visam abordar as vulnerabilidades identificadas na visão inicial, garantindo a confidencialidade, integridade e disponibilidade dos dados e do sistema. A implementação de autenticação e autorização robustas, comunicação criptografada e armazenamento seguro são cruciais para proteger a privacidade dos dados sensíveis dos usuários. A validação de entrada e o rate limiting protegem contra ataques comuns da web, enquanto o monitoramento e a auditoria fornecem visibilidade sobre a segurança do sistema. A configuração segura do PM2 e das imagens Docker (se aplicável) minimiza a superfície de ataque na infraestrutura. Essas medidas, em conjunto, criam uma arquitetura mais resiliente e segura para o sistema "AI Agents Tool".
