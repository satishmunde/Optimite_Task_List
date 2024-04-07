import requests

countriesAPI = 'https://restcountries.com/v2/all'
catsAPI = 'https://api.thecatapi.com/v1/breeds'

def cat_avg_weight():
    response = requests.get(catsAPI)
    if response.status_code == 200:
        breeds = response.json()
        total_weight = 0
        count = 0
        for breed in breeds:
            if 'weight' in breed:
                weight_metric = breed['weight']['metric'].split()[0]
                total_weight += float(weight_metric)
                count += 1
        if count > 0:
            avg_weight = total_weight / count
            return avg_weight
        else:
            return None
    else:
        print("Error:", response.status_code)

def get_lrg_country():
    response = requests.get(countriesAPI)
    if response.status_code == 200:
        countries = response.json()

        areaOfCountry = [country for country in countries if 'area' in country]

        areaOfCountry.sort(key=lambda x: x['area'], reverse=True)
        lrg_country = areaOfCountry[:10]
        return lrg_country
    else:
        print("Error:", response.status_code)

def count_of_lang():
    response = requests.get(countriesAPI)
    if response.status_code == 200:
        countries = response.json()
        languages = set()
        for country in countries:
            if 'languages' in country:
                for lang in country['languages']:
                    languages.add(lang['name'])
        print(languages)
        return len(languages)
    else:
        print("Error:", response.status_code)

avg_weight = cat_avg_weight()
print("avg cat weight in metric units:", avg_weight, "kg")

lrg_country = get_lrg_country()
if lrg_country:
    print("10 largest countries:")
    for country in lrg_country:
        print(country['name'], "-", country['area'], "square kilometers")
else:
    print("Failed.")


total_lang = count_of_lang()
print("Total number of official languages in the world:", total_lang)
