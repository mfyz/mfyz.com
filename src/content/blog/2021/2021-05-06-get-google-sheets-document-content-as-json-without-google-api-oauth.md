---
title: "Get Google Sheets document content as JSON without Google API oAuth"
slug: get-google-sheets-document-content-as-json-without-google-api-oauth
date: 2021-05-06
url: https://mfyz.com/?p=649
tags: ["Other"]
category: Other
migration: {"wpId":649,"wpPostDate":"2021-05-06T18:29:39.000Z"}
---

Use an existing google sheet document or create a new google sheet and once you are done with your content;

![example google sheet document](/images/archive/en/2021/05/image-3.png)

“Click Share” button on top right corner:

![google sheet share dialog](/images/archive/en/2021/05/image-5.png)

By default, the “link sharing” is not enabled by default.

In the “Get Link” section, click "Change to anyone with the link"

![google sheet share dialog with public link](/images/archive/en/2021/05/image-2.png)

 Copy the link and click Done to close this pop-up.

Now, as second step on the google sheet side, we have to publish the document to web. To do that, click “File > Publish to the web” option from the menu.

![google sheet file menu](/images/archive/en/2021/05/image-1.png)

 And publish your document in the publish pop-up:

![google sheet publish to web dialog](/images/archive/en/2021/05/image-4.png)

We’re done on the google sheet side. Now we’ll get the document id from the url we copied and reformat it for the JSON output.

```
https://docs.google.com/spreadsheets/d/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/edit?usp=sharing
```

Get the document id from the link. For the example sheet I created (the link above), the document id is:

```
1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI
```

Now, let’s construct our JSON url using the document id:

```
https://spreadsheets.google.com/feeds/cells/_YOUR_SHEET_ID_/_SHEET_NUMBER_/public/full?alt=json
```

As you see, aside of the document id, you need to define the sheet index. It’s the sheet tab you want to get as JSON object needs to be entered as number in the url template above.

My sample document had just one tab so the tab index will be “1”. The final url for this example will be:

[https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full?alt=json](https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full?alt=json)

Now you can access to the content of the sheet in a flattened object. 

```json
{
  "version": "1.0",
  "encoding": "UTF-8",
  "feed": {
    "xmlns": "http://www.w3.org/2005/Atom",
    "xmlns$openSearch": "http://a9.com/-/spec/opensearchrss/1.0/",
    "xmlns$batch": "http://schemas.google.com/gdata/batch",
    "xmlns$gs": "http://schemas.google.com/spreadsheets/2006",
    "id": {
      "$t": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full"
    },
    "updated": {
      "$t": "2021-04-28T16:11:58.672Z"
    },
    "category": [
      {
        "scheme": "http://schemas.google.com/spreadsheets/2006",
        "term": "http://schemas.google.com/spreadsheets/2006#cell"
      }
    ],
    "title": {
      "type": "text",
      "$t": "Sheet1"
    },
    "link": [
      {
        "rel": "alternate",
        "type": "application/atom+xml",
        "href": "https://docs.google.com/spreadsheets/d/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/pubhtml"
      },
      {
        "rel": "http://schemas.google.com/g/2005#feed",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full"
      },
      {
        "rel": "http://schemas.google.com/g/2005#post",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full"
      },
      {
        "rel": "http://schemas.google.com/g/2005#batch",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/batch"
      },
      {
        "rel": "self",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full?alt=json"
      }
    ],
    "author": [
      {
        "name": {
          "$t": "..."
        },
        "email": {
          "$t": "..."
        }
      }
    ],
    "openSearch$totalResults": {
      "$t": "4"
    },
    "openSearch$startIndex": {
      "$t": "1"
    },
    "gs$rowCount": {
      "$t": "1000"
    },
    "gs$colCount": {
      "$t": "26"
    },
    "entry": [
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R1C1"
        },
        "updated": {
          "$t": "2021-04-28T16:11:58.672Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#cell"
          }
        ],
        "title": {
          "type": "text",
          "$t": "A1"
        },
        "content": {
          "type": "text",
          "$t": "A1-Test"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R1C1"
          }
        ],
        "gs$cell": {
          "row": "1",
          "col": "1",
          "inputValue": "A1-Test",
          "$t": "A1-Test"
        }
      },
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R1C2"
        },
        "updated": {
          "$t": "2021-04-28T16:11:58.672Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#cell"
          }
        ],
        "title": {
          "type": "text",
          "$t": "B1"
        },
        "content": {
          "type": "text",
          "$t": "B1-Test"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R1C2"
          }
        ],
        "gs$cell": {
          "row": "1",
          "col": "2",
          "inputValue": "B1-Test",
          "$t": "B1-Test"
        }
      },
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R2C1"
        },
        "updated": {
          "$t": "2021-04-28T16:11:58.672Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#cell"
          }
        ],
        "title": {
          "type": "text",
          "$t": "A2"
        },
        "content": {
          "type": "text",
          "$t": "A2-Test"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R2C1"
          }
        ],
        "gs$cell": {
          "row": "2",
          "col": "1",
          "inputValue": "A2-Test",
          "$t": "A2-Test"
        }
      },
      {
        "id": {
          "$t": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R2C2"
        },
        "updated": {
          "$t": "2021-04-28T16:11:58.672Z"
        },
        "category": [
          {
            "scheme": "http://schemas.google.com/spreadsheets/2006",
            "term": "http://schemas.google.com/spreadsheets/2006#cell"
          }
        ],
        "title": {
          "type": "text",
          "$t": "B2"
        },
        "content": {
          "type": "text",
          "$t": "B2-Test"
        },
        "link": [
          {
            "rel": "self",
            "type": "application/atom+xml",
            "href": "https://spreadsheets.google.com/feeds/cells/1yxaigtzh48EV8sJioJIZJz_HovKQ6OJH6BLq1alA4GI/1/public/full/R2C2"
          }
        ],
        "gs$cell": {
          "row": "2",
          "col": "2",
          "inputValue": "B2-Test",
          "$t": "B2-Test"
        }
      }
    ]
  }
}
```

You can construct a matrix on your integration using following javascript address in the large JSON response:

```
feed.entry[].gs$cell
```

this sub-object will contain the row, cell and the text value of the cell. If you have formulas, you can get the raw entry in the cell in this object as well.

**Note:** When you hit your constructed JSON url, if you get the error below, make sure you published your document publicly.

![google sheets not published document error](/images/archive/en/2021/05/image.png)