from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes to handle different interactions
@app.get("/")
def root():
    return {"Spotify Dashboard" : "Jared"}

@app.get("/top-tracks")
async def getTopTrack():
    with open("./data/top_artists.json") as file:
        return json.load(file)

@app.get("/listening-hours")
async def getListeningHours():
    with open("./data/listening.json") as file:
        return json.load(file)

@app.get("/spotify-data")
async def getSpotifyData():
    with open("./data/grouped.json") as file:
        return json.load(file)