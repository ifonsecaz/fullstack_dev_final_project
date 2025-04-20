from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features
from ibm_watson.natural_language_understanding_v1 import SentimentOptions

user = ""
password = ""
sentiment_analyzer_url = ""


authenticator = IAMAuthenticator(password)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2022-04-07',
    authenticator=authenticator
)

natural_language_understanding.set_service_url(sentiment_analyzer_url)

response = natural_language_understanding.analyze(
    text='With great power comes great responsibility',
    features=Features(
      sentiment=SentimentOptions())).get_result()

print(response['sentiment'])
