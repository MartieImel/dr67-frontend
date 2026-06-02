Este diretório é destinado aos assets públicos (imagens, ícones, etc.).

Para completar a unificação do projeto, copie os conteúdos de:

  ../Danganonpa 67/img/
  ../Danganonpa 67/public/

para cá. Exemplo de comando PowerShell (a partir deste diretório):

  Copy-Item -Path "..\..\Danganronpa 67\img\*" -Destination .\img -Recurse
  Copy-Item -Path "..\..\Danganronpa 67\public\*" -Destination .\public -Recurse

Depois de copiar, rode `npm install` e `npm run dev` em `Danganronpa 67 - V2`.
