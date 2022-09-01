image:
	docker build --no-cache -t example-app .

run:
	docker run -p 8585:8585 example-app:latest

clean:
	cd lib && npx unimported && cd ../example && npx unimported
