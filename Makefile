.PHONY: start stop

test:
	@                                                               \
	open http://127.0.0.1:8000/tests &                              \
	python -m SimpleHTTPServer

start: stop
	@                                                               \
	open http://127.0.0.1:8000/src;                                 \
	python -m SimpleHTTPServer &                                    \
	./api-demo/index.js &                                           \

stop:
	@                                                               \
	lsof -i:1234 | awk 'NR==2{print $$2}' | xargs kill -9;          \
	lsof -i:8000 | awk 'NR==2{print $$2}' | xargs kill -9;          \
