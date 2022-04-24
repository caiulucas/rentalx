# Cadastro de carros

## Requisitos Funcionais -> RF
- [x] Deve ser possível cadastrar um novo carro

## Regras de Negócio -> RN
- [x] Não deve ser possível cadastrar um carro com uma placa já existente
- [x] O carro deve ser cadastrado estando disponível por padrão
- [x] Somente usuários administradores podem cadastrar carros
---
# Listagem de carros

## Requisitos Funcionais -> RF
- [x] Deve ser possível listar todos os carros disponíveis
- [x] Deve ser possível listar todos os carros pelo nome do carro
- [x] Deve ser possível listar todos os carros pelo nome da categoria
- [x] Deve ser possível listar todos os carros pelo nome da marca

## Regras de Negócio -> RN
- [x] O usuário não precisar estar logado no sistema para conseguir listar os carros
---
# Cadastro de especificação no carro

## Requisitos Funcionais -> RF
- [x] Deve ser possível cadastrar uma ou mais especificações para um carro

## Regras de Negócio -> RG
- [X] Não deve ser possível cadastrar especificações para um carro não cadastrado
- [X] Não deve ser possível cadastrar a mesma especificação mais de uma vez no mesmo carro
- [X] Somente usuários administradores podem cadastrar especificações
---
# Cadastro de imagem do carro

- [ ] Deve ser possível cadastrar a imagem do carro

## Requisitos Não Funcionais -> RNF
- [ ] Utilizar o multer para upload de arquivos

## Regras de Negócio -> RN
- [ ] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [ ] Somente usuários administradores podem cadastrar imagens para carros

# Aluguel de carros

## Requisitos Funcionais -> RF
- [ ] Deve ser possível cadastrar um aluguel

## Regras de Negócio -> RN
- [ ] O aluguel deve ter duração mínima de 24 horas
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- [ ] - [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário 