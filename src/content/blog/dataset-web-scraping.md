---
title: "How to create your dataset with web-scraping"
description: "Scraping Glassdoor with Python and Scrapfly"
date: 2024-02-03
tags: [python, web-scraping, datasets]
icon: "🕸️"
cover: "/blog/covers/dataset-web-scraping.jpg"
---

*Scraping Glassdoor with Python and Scrapfly. Publicado originalmente en [The Deep Hub](https://medium.com/thedeephub/how-to-create-your-dataset-with-web-scraping-1a268dbc3302).*

![Image created by the author with DALL-E 3](https://miro.medium.com/v2/resize:fit:700/0*ksW68wsgdTWy6CKu)
*Image created by the author with DALL-E 3*

Nowadays, society is becoming aware of the **immense power of data**. Companies like **Meta** are building their **entire strategies around the potential of information** and **state-of-the-art technologies** such as GPT are being trained with it.

Is not a mystery that **machine learning has become a very valuable skill**, and jobs such as **data scientists** whose main role is to **analyze the data** are each time in **higher demand**.

However, there is a general trend in the data world.

While data experts are great at coming up with **insightful conclusions from complex models**, they are perhaps not so familiar with other fundamental skills such as **extracting information**.

And this is a reality in **data science:**

> We tend to forget that building our dataset is even more important than analyzing it.

I mean, if **you don´t have the data**, then your great **ML knowledge** won´t be very useful right?

In this article, I will show you how you can build your **own dataset via web scraping**.

More concretely we´ll be scraping **Glassdoor**, a famous **job portal** where you can find any type of **employment offer**.

**What we will be extracting?**

To keep it simple, I will be scraping two components:

- The name of the company
- The rating which it was given.

This is the link I will be using in case you want to give it a look in advance:

[https://www.glassdoor.com/Reviews/index.htm](https://www.glassdoor.com/Reviews/index.htm)

### The problem with web scraping in actuality

Nowadays, is getting **harder and harder** to scrape data.

The companies are each time **more aware of how valuable their public information is** and try to keep their access **as restrictive as possible** (even though it´s public).

Glassdoor is not an exception.

**# But if the data is public how do companies protect it?**

Well, in the scraping world things are not **as straightforward** as you may think.

Companies **can´t fully restrict** others from scraping their “public” data. But they can make it difficult for you to extract it.

By employing a variety of **technical barriers** and **monitoring techniques**, businesses can detect and block **automated scraping activities, limiting unauthorized data extraction**.

These measures (amongst others) include the implementation of:

- CAPTCHAs
- IP address rate limiting,
- Requiring user authentication,

These obstacles **do not make scraping impossible** but significantly increase the **effort** and **sophistication** required to successfully **collect data from these sites**.

### Scrapfly — A game changer

But don´t worry, we have **scrapifly** to solve all our problems!

Scrapfly is a **web scraping tool** designed to simplify the process of extracting data from websites.

> **[Scrapfly Web Scraping API](https://scrapfly.io/)**
> Scrapfly is a Web Scraping API providing residential proxies, headless browser to extract data and bypass captcha /…

Key features include its ability to **navigate through pages**, understand and interpret the **structure of websites**, and **extract relevant data** in a structured format, such as **CSV** or **JSON**.

It also offers solutions to overcome common challenges, such as **handling CAPTCHAs**, **managing cookies and sessions**, and **rotating IP addresses** to avoid detection and blocking by web servers.

> If you have no idea of what I´m talking about and want to learn more about **web scraping**, I highly recommend this course.

*Web scraping with **Scrapy** — Freecodecamp*

### Scraping Glassdoor

Perfect, now that we´ve gained **some basic insights about the general scraping landscape** let´s start to build our scraper.

The first step will be **to create a free account on Scrapfly**.

You just have to sign up here: [https://scrapfly.io/](https://scrapfly.io/)

![](https://miro.medium.com/v2/resize:fit:1000/1*qiKlGnWU4LwkSYajT1LmeQ.png)

Once logged in, on top of the page, you can find your **API key**.

In addition, in the **My Subscription** section, you will see important information about your account.

With the **Quota usage**, you can keep track of how many credits you have left.

> The free plan enables you to consume up to 1000 credits (1000 API calls).

## Programming the scraper

Once we have created an **account** in Scrapfly we are ready to start building our **scrapper**.

You will see that the process is much simpler with the **built-in functions of Scrapfly** and with just a few lines of code we´ll be able **to scrape thousands of pages**.

Let´s go through the steps to create our **Glassdoor scrapper**.

*(At the end of the article, I will provide the complete code).*

### # 1. Importing libraries

```python
from scrapfly import ScrapflyClient, ScrapeConfig
from bs4 import BeautifulSoup
import csv
```

- We´ll use `ScrapflyClient` to interact with the **Scrapfly API**, and `ScrapeConfig` to configure the details of the **web scraping operation**.
- After accessing the page, we will **extract the necessary data** from it with `bs4` (BeautifulSoup).
- Finally, with the library, `csv`the program **will store the information in a CSV file**.

### # 2. Creating an instance of ScrapflyClient

Once we have created our account in Scrapfly, we can use it in our script **by creating an instance** bia the ScrapflyClient.

This step is quite straightforward you just have **to pass your API key to the function**.

```python
scrapfly_key = 'Your API-key'  
client = ScrapflyClient(key=scrapfly_key)
```

### # 3. Building the scraper function

Now we are all set to start scraping Glassdoor.

In the first place, I’ll define **the base URL** we’ll be scraping and an **empty list** where all the information will be stored.

```python
def scrape_glassdoor():
    companies_info = []
    base_url = "https://www.glassdoor.com/Reviews/index.htm"
```

**## 3.1. Creating a loop to iterate over the pages**

```python
for page_num in range(1,100):  # Adjust the range as needed
        url = f"{base_url}?overall_rating_low=1&page={page_num}&filterType=RATING_OVERALL"
```

In this example, I have set the range **from 1 to 100** to go through **the first 100 pages**. However, you can adjust it as you prefer.

> With the **free credit of Scrapfly**, you will be able to scrape around 50 pages.

**## 3.2. Bypassing Glassdoor anti-scraping measures**

When accessing pages for scraping, we need **to surpass Glassdoor security measures to get the HTML structure** (if you make a simple request you will get a [**404 error**](https://en.wikipedia.org/wiki/HTTP_404)).

To do this, I will use the **ScrapeConfig method** we talked about before.

```python
result = client.scrape(ScrapeConfig(
    url=url,
    asp=True,
    country="US",
    proxy_pool="public_residential_pool"))
```

- `url`: This parameter specifies **the web page's URL** that you want to scrape.
- The `asp` flag suggests that the scraping operation is configured **to handle or simulate asynchronous JavaScript requests**.
- `country`: By specifying **"US"** for the country, this configuration hints **at the geographical targeting of the request**.
- The `proxy_pool` parameter indicates the use of a ***"public_residential_pool"*** of proxies for making requests.

**Asynchronous pages**
In modern web pages content is **typically loaded dynamically** via **JavaScript** rather than being **statically available in the initial HTML response**.

This **presents a challenge** for web scraping as the desired content may not be in the initial **HTML response**.

**Proxy residential pool**
This is a strategy **to rotate through different IP addresse**s, making it harder for the target website **to detect and block the scraping operation** due to r**epetitive requests** coming from **the same IP address**.

This technique involves **using a pool of hundreds or thousands of proxies**, often **spread across different geographic locations**.

By rotating them, a scraper can avoid being caught, **reducing the risk of getting banned or blocked**.

**## 3.3. Creating the HTML selectors**

After accessing the HTML of the website, we search for the **company name** and **rating** within the **tags**.

Now we have bypassed **Glassdoor security**, we just have to find where our data is located **inside the structure of the web page**.

> To access the **HTML** content of the webpage just press **f12**.

![Company name tag: [data-test=”employer-short-name”]](https://miro.medium.com/v2/resize:fit:1000/1*1-3x_VTqFGHARreHoO9R_Q.png)
***Company name** tag: [data-test=”employer-short-name”]*

![Comapny rating tag: ‘.ratingsWidget__RatingsWidgetStyles__rating’](https://miro.medium.com/v2/resize:fit:1000/1*CAvf78Ba6hlMjVVKull_7A.png)
***Comapny rating** tag: ‘.ratingsWidget__RatingsWidgetStyles__rating’*

Once we have identified **the location of the selectors**, the process is very simple.

In the first place, we **initialize BeautifulSoup** with the **html.parser**.

> When you pass `result.content` and `'html.parser'` to `BeautifulSoup`, it parses the **raw HTML** content into a **BeautifulSoup object**.This object **transforms the HTML document into a complex tree** **of Python objects**. The top-level object is a `BeautifulSoup` object itself, and it contains **nested tag objects**, **navigable string** objects, and **other BeautifulSoup objects**.

```python
soup = BeautifulSoup(result.content, 'html.parser')

company_names = soup.select('[data-test="employer-short-name"]') 
company_ratings = soup.select('.ratingsWidget__RatingsWidgetStyles__rating') 
```

**## 3.4. Storing the information in our list**

After extracting the data, we´ve done all the hard work, and now we just have to transfer the information to our list structure.

```python
for name, rating in zip(company_names, company_ratings):
        companies_info.append({
            'name': name.get_text(strip=True),
            'rating': rating.get_text(strip=True)})
```

**# 3.5. Putting all together**

```python
def scrape_glassdoor():
    companies_info = []
    base_url = "https://www.glassdoor.es/Opiniones/index.htm"

    for page_num in range(1,1000):  # Adjust the range as needed
        url = f"{base_url}?overall_rating_low=1&page={page_num}&filterType=RATING_OVERALL"

        result = client.scrape(ScrapeConfig(
            url=url,
            asp=True,
            country="US",
            proxy_pool="public_residential_pool",
        ))

        soup = BeautifulSoup(result.content, 'html.parser')

        # Update these selectors based on the actual HTML structure of Glassdoor
        company_names = soup.select('[data-test="employer-short-name"]')  
        company_ratings = soup.select('.ratingsWidget__RatingsWidgetStyles__rating')  

        for name, rating in zip(company_names, company_ratings):
            companies_info.append({
                'name': name.get_text(strip=True),
                'rating': rating.get_text(strip=True)
            })
        print(f"Page {page_num} scraped successfully.")

    return companies_info
```

### # 5. Passing the data into a CSV

Finally, to store our data we can just write a simple function with the **csv library**.

*(I won´t put much emphasis on this part. There are a lot of ways in which you can do it, so feel free to save your dataset as you prefer).*

```python
def save_to_csv(data, filename):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Name', 'Rating'])  # Header row
        for item in data:
            writer.writerow([item['name'], item['rating']])

# Save to CSV
csv_filename = "Your\file\path"

save_to_csv(company_data, csv_filename)
```

### I have created my dataset, what´s next?

Great! After **extracting the data for our dataset**, we can utilize it for various purposes.

You can use it for **individual studies**. But you can also **contribute to the open source**.

One great way to do this is **by making public your dataset in Kaggle**.

I´ve uploaded the **CSV** that I generated **with the code of this article**, you can take a look at it at the following link:

> **[Glasdoor companies rating](https://www.kaggle.com/datasets/jorgecardete/glasdoor-companies-rating)**
> Kaggle is the world's largest data science community with powerful tools and resources to help you achieve your data…

### Complete code

*Complete **scrapper** code*

### Bibliography

- [https://scrapfly.io/blog/how-to-scrape-glassdoor/](https://scrapfly.io/blog/how-to-scrape-glassdoor/)
- [https://www.scraperapi.com/blog/how-to-scrape-glassdoor/](https://www.scraperapi.com/blog/how-to-scrape-glassdoor/)
- [https://github.com/topics/glassdoor-scraper](https://github.com/topics/glassdoor-scraper)
- [https://blog.apify.com/how-to-scrape-glassdoor/](https://blog.apify.com/how-to-scrape-glassdoor/)

*Thanks for reading! If you like the article make sure to clap (up to 50!) and follow me on* [*Medium*](https://medium.com/@jorgecardete) *to stay updated with my new publications.*
