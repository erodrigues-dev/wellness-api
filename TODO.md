# TODO CARD#76 appointments

## Permission

- [x] listar atividades
- [x] agendar atividade
- [x] cancelar atividade

## listar atividades

- [x] listar atividades compradas pelo cliente
- [x] verificar status do pagamento
- [ ] verificar a quantidade/plano comprado

## listar dias

- [x] listar dias por periodo;
- [x] listar apenas dias disponiveis
- [x] listar apenas data >= date.now

## listar horarios

- [x] listar horarios
- [x] verificar disponibilidade
- [x] listar apenas horarios >= date.time.now

## agendar atividade

- [x] criar tabela de agendamento
- [x] agendar
- [x] listar agendamentos
- [x] verificar disponibilidade de horario
- [x] verificar quantidade de pessoas
- [x] verificar pagamento
- [x] validar date.time >= date.time.now ???
- [x] validar package recurrency
- [x] validar package tipo unlimeted
- [x] validar package tipo minutes
- [x] validar package tipo amount
- [x] validar package tipo appointments
- [x] validar recurrency
- [x] validate activity plano/quantidade
- [ ] send email

## cancelar agendamento

- [x] cancelar
- [ ] enviar email
- [ ] disponibilizar horario
- [ ] estornar uso da atividade na conta do cliente

## workflow status

- [x] workflow: scheduled -> arrived -> completed
- [x] change status
- [ ] send email: scheduled, canceled

## create order_activity

- [x] field quantity
