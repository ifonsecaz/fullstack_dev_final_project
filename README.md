0. conda activate flask
o activar ambiente de python con django
python -m pip install -U -r requirements.txt 

1. Build frontend
/server/frontend
npm install
npm run build

2. Migraciones
/server
python manage.py makemigrations
python manage.py migrate
//permite crear tablas sin migraciones
python manage.py migrate --run-syncdb

2.5 Crear superusuario admin
python manage.py createsuperuser

3. Docker Mongo DB
desde /server/databases
docker build . -t nodeapp
//levantar ambos contenedores
docker-compose up 

desde /server/carsInventory
docker build . -t nodeapp
docker-compose up

4. Deploy sentiment analysis on Code Engine as a microservice
on Code Engine CLI
Desde /server/djangoapp/microservices
docker build . -t us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer
docker push us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer
deploy
ibmcloud ce application create --name sentianalyzer --image us.icr.io/${SN_ICR_NAMESPACE}/senti_analyzer --registry-secret icr-secret --port 5000

5. Levantar
python manage.py runserver

6. Subir a container registry
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
docker build -t us.icr.io/$MY_NAMESPACE/dealership .
docker push us.icr.io/$MY_NAMESPACE/dealership
kubectl apply -f deployment.yaml
kubectl port-forward deployment.apps/dealership 8000:8000
