import py_compile
import tweepy
import datetime
from config import *

# # Creating the authentication object
# auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
# # Setting your access token and secret
# auth.set_access_token(access_token, access_token_secret)
# # Creating the API object while passing in auth information
# api = tweepy.API(auth, wait_on_rate_limit=True) 


tweepy_client = tweepy.Client(bearer_token, consumer_key, consumer_secret, access_token, access_token_secret )

tweets = tweepy_client.search_recent_tweets('#ukraine')
# import pandas as pd
# df = pd.DataFrame(output)
# df.to_csv('output.csv')
