package main

import (
	"CompanyScraper/database"
	"context"
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/gocolly/colly"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/mgo.v2/bson"
)

type Data struct {
	Name  string
	ScId  string
	NseId string
	BseId string
}
type CompanyData struct {
	Id    primitive.ObjectID `bson:"_id" json:"id"`
	Name  string             `bson:"name" json:"name"`
	ScId  string             `bson:"scId" json:"scId"`
	NseId string             `bson:"nseId" json:"nseId"`
	BseId string             `bson:"bseId" json:"bseId"`
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandomString() string {
	b := make([]byte, rand.Intn(10)+10)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

var companyCollection = database.OpenCollection(database.Client, "companies")
var marketIndexCollection = database.OpenCollection(database.Client, "marketIndex")
var trendingStocksCollection = database.OpenCollection(database.Client, "trendingStocks")

func PostCompany(company *CompanyData) bool {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	company.Id = primitive.NewObjectID()
	// count, err := companyCollection.CountDocuments(ctx, bson.M{"ScId": company.ScId})
	// defer cancel()
	// if err != nil {
	// 	fmt.Println("error in countingdicment")
	// 	return false
	// }
	// if count > 0 {
	// 	fmt.Println("Already exist")
	// 	return false
	// }
	res, err := companyCollection.InsertOne(ctx, company)
	defer cancel()
	if err != nil {
		fmt.Println(err)
		return false
	} else {
		fmt.Println("Inserted :- ", res)
		return true
	}

}

func PostMarketIndex(marketIndex *MarketIndexData, dataType string) bool {

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	marketIndex.Id = primitive.NewObjectID()
	marketIndex.IndexId = "123"
	marketIndex.Created_at = time.Now()
	if dataType == "major-indices" {
		_, err1 := marketIndexCollection.DeleteOne(ctx, bson.M{"indexid": marketIndex.IndexId})
		if err1 != nil {
			fmt.Printf("erros is %v", err1)
			return false
		}
		defer cancel()
		res, err := marketIndexCollection.InsertOne(ctx, marketIndex)
		defer cancel()
		defer cancel()
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			fmt.Println("Inserted :- ", res)
			return true
		}
	} else if dataType == "trending-stocks" {
		_, _ = trendingStocksCollection.DeleteOne(ctx, bson.M{"indexid": marketIndex.IndexId})
		defer cancel()
		res, err := trendingStocksCollection.InsertOne(ctx, marketIndex)
		defer cancel()
		defer cancel()
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			fmt.Println("Inserted :- ", res)
			return true
		}
	}
	return false
}

func InnerScraping(url string, demoData *CompanyData) {
	c1 := colly.NewCollector(
		colly.CacheDir("./cache"),
	)
	c1.OnHTML("input[id='nseid']", func(e *colly.HTMLElement) {
		// fmt.Println(e.Attr("value"))
		demoData.NseId = e.Attr("value")
	})
	c1.OnHTML("input[id='bseid']", func(e *colly.HTMLElement) {
		// fmt.Println(e.Attr("value"))
		demoData.BseId = e.Attr("value")
	})
	c1.OnHTML("input[id='scid']", func(e *colly.HTMLElement) {
		// fmt.Println(e.Attr("value"))
		demoData.ScId = e.Attr("value")
	})
	c1.OnRequest(func(r *colly.Request) {
		r.Headers.Set("User-Agent", RandomString())

	})
	c1.OnScraped(func(r *colly.Response) {
		if len(demoData.BseId) > 1 && len(demoData.NseId) > 1 && len(demoData.ScId) > 1 {
			fmt.Println("Posting :- ", demoData)
			PostCompany(demoData)
		}
	})
	c1.Visit(url)
}

type MarketIndex struct {
	Name          string `json:"name"`
	Last          string `json:"last"`
	High          string `json:"high"`
	Low           string `json:"low"`
	ChangePercent string `json:"changePercent"`
	Change        string `json:"change"`
	DateofFetch   string `json:"dateofFetch"`
}
type MarketIndexData struct {
	Id         primitive.ObjectID `bson:"_id" json:"id"`
	Data       []MarketIndex      `json:"data"`
	Created_at time.Time          `json:"created_at"`
	IndexId    string             `json:"indexId"`
}
type TrendingStock struct {
	Id         primitive.ObjectID `bson:"_id" json:"id"`
	Data       []MarketIndex      `json:"data"`
	Created_at time.Time          `json:"created_at"`
	IndexId    string             `json:"indexId"`
}

func main() {
	c := colly.NewCollector(
		colly.CacheDir("./cache"),
	)

	// <table class="common-table js-table js-streamable-table high"> </table>
	// find the table with class common-table
	var IndexData = MarketIndexData{}
	c.OnHTML("table.common-table.js-table", func(e *colly.HTMLElement) {
		// create a empty array of string

		e.ForEach("tr", func(_ int, el *colly.HTMLElement) {
			// create a array of each row
			var rowdata []string = []string{}
			el.ForEach("td.col-name", func(_ int, el *colly.HTMLElement) {
				//remove the space from the string
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-high", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-last", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-low", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-chg_pct", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-chg", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})
			el.ForEach("td.col-time", func(_ int, el *colly.HTMLElement) {
				fomatedData := strings.TrimSpace(el.Text)
				rowdata = append(rowdata, fomatedData)
			})

			if len(rowdata) == 7 {
				var marketIndex MarketIndex = MarketIndex{
					Name:          rowdata[0],
					Last:          rowdata[1],
					High:          rowdata[2],
					Low:           rowdata[3],
					ChangePercent: rowdata[4],
					Change:        rowdata[5],
					DateofFetch:   rowdata[6],
				}
				IndexData.Data = append(IndexData.Data, marketIndex)
			}

		})
		// copy the data to the struct of MarketIndex
	})
	url := "https://in.investing.com/equities/trending-stocks"

	c.OnScraped(func(r *colly.Response) {
		// get the last name of the url
		last := strings.Split(url, "/")
		end := last[len(last)-1]
		PostMarketIndex(&IndexData, end)
		IndexData = MarketIndexData{}
	})
	c.Visit(url)
}

// func main() {

// 	c := colly.NewCollector(
// 		colly.CacheDir("./cache"),
// 	)
// 	var demoData CompanyData = CompanyData{}
// 	c.OnHTML("table", func(e *colly.HTMLElement) {
// 		e.ForEach("tr", func(_ int, el *colly.HTMLElement) {
// 			el.ForEach("td", func(_ int, el *colly.HTMLElement) {
// 				el.ForEach("a", func(_ int, el *colly.HTMLElement) {

// 					// PostCompany(demoData)
// 					// demoData = Data{}
// 					demoData.Name = el.Text
// 					fmt.Println("Scraping :- ", el.Text)
// 					InnerScraping(el.Attr("href"), &demoData)
// 				})
// 			})
// 		})
// 	})

// 	c.OnScraped(func(r *colly.Response) {
// 		fmt.Println("-------------------***-------------------")
// 		println("Finished", r.Request.URL.String())
// 		fmt.Println("-------------------***-------------------")
// 	})

// 	c.OnRequest(func(r *colly.Request) {
// 		r.Headers.Set("User-Agent", RandomString())

// 	})

// 	for i := 65; i <= 90; i++ {

// 		url := fmt.Sprintf("https://www.moneycontrol.com/india/stockpricequote/%c", i)
// 		c.Visit(url)
// 		fmt.Println("-------------------***-------------------")
// 		fmt.Println("Complted for :- ", url)
// 		fmt.Println("-------------------***-------------------")
// 		// url := "https://www.moneycontrol.com/india/stockpricequote/miningminerals/coalindia/CI11"
// 		// c.Visit(url)

// 	}

// }
