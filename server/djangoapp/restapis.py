# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv
from .llaves import password
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 \
    import Features, SentimentOptions as Sentiment

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")
searchcars_url = os.getenv(
    'searchcars_url',
    default="http://localhost:3050/")

authenticator = IAMAuthenticator(password)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2022-04-07',
    authenticator=authenticator
)

natural_language_understanding.set_service_url(sentiment_analyzer_url)


# def get_request(endpoint, **kwargs):
def get_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception:
        # If any error occurs
        print("Network exception occurred")


# modificar en views tambien
def analyze_review_sentiments(text):
    # request_url = sentiment_analyzer_url+"analyze/"+text
    request_url = sentiment_analyzer_url  # added
    myobj = {'text': text, 'features': {'sentiment': {}}}  # added
    try:
        # Call get method of requests library with URL and parameters
        print("peticion")
        print(request_url)
        print(myobj)
        # response = requests.get(request_url)
        """
        x = requests.post(request_url,
                          auth=HTTPBasicAuth(user, password),
                          json = myobj,
                          headers = {"Content-Type": "application/json"})
        """
        x = natural_language_understanding.analyze(text=text,
                                                   features=Features(
                                                       sentiment=Sentiment()
                                                       )).get_result()
        # return response.json()
        print("response2")
        print(x)
        # return x.json()
        return x
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except Exception:
        print("Network exception occurred")


def searchcars_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params+key + "=" + value + "&"

    request_url = searchcars_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception:
        # If any error occurs
        print("Network exception occurred")
    finally:
        print("GET request call complete!")
