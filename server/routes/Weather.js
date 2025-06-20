const express = require("express");
const router = express.Router();
const axios = require("axios");
const { WeatherData, Users } = require("../models");

const OPENWEATHER_API_KEY = "94dfa0959a79a3cbcf955544f2639a41";

router.post("/", async (req, res) => {
  const { location, userId } = req.body;

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    const newWeatherData = await WeatherData.create({
      location,
      userId,
      data: weatherResponse.data,
    });

    res.status(201).json(newWeatherData);
  } catch (error) {
    console.error("Error fetching/saving weather data:", error);
    res.status(500).json({ error: "Failed to fetch or save weather data" });
  }
});

module.exports = router;
