FROM alpine:3.20 AS build
RUN printf 'F1 ECR pilot\n' > /pilot.txt

FROM alpine:3.20 AS runtime
COPY --from=build /pilot.txt /pilot.txt
ENTRYPOINT ["uname", "-m"]
