### Criar uma Nova Migração
`npx typeorm migration:create ./src/Infrastructure/Migrations/{nameMigration}` 

### Aplicar Migrações Pendentes
`npx typeorm migration:run -d dist/src/Infrastructure/Database/dataSource.js`

### Reverter Última Migration
`npx typeorm migration:revert -d dist/src/Infrastructure/Database/dataSource.js`

###### Este é o caminho pro dataSource com as configurações do banco
    dist/src/Infrastructure/Database/dataSource.js 