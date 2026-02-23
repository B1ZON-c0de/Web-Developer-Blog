import { translationCondition } from '@/constants/translationCondition'
import { ref } from 'vue'

export const useWeather = () => {
  const WEATHER_API_URL =
    'https://api.weather.yandex.ru/v2/forecast'
  const GEO_API_URL = 'https://get.geojs.io/v1/ip/geo.json'

  const city = ref<string>('')
  const temp = ref<number | null>(null)
  const condition = ref<string | null>(null)
  const isLoading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const getWeatherFromIp = () => {
    isLoading.value = true
    error.value = null
    fetch(GEO_API_URL)
      .then((response) => response.json())
      .then((json) => {
        fetchWeatherData(json.latitude, json.longitude)
      })
      .catch((e) => {
        isLoading.value = false
        console.log(e.message)
        error.value = 'Ошибка получения города'
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const fetchWeatherData = (lat: number, lon: number) => {
    const headers = {
      'X-Yandex-Weather-Key': import.meta.env
        .VITE_YANDEX_WEATHER_API_KEY,
    }

    fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&lang=ru_RU`,
      { headers },
    )
      .then((response) => response.json())
      .then((json) => {
        isLoading.value = false
        city.value = json?.geo_object?.locality?.name
        temp.value = Number(json?.fact?.temp)
        condition.value =
          translationCondition[json?.fact?.condition] ||
          json?.fact?.condition
      })
      .catch((e) => {
        isLoading.value = false
        console.log(e.message)
        error.value = 'Ошибка загрузки погоды'
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return {
    city,
    temp,
    condition,
    isLoading,
    error,
    getWeatherFromIp,
  }
}
