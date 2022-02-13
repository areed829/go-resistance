FROM golang:1.17.7-buster

WORKDIR /app

COPY . .

RUN go build -o main .

ENTRYPOINT ["/app/main"]