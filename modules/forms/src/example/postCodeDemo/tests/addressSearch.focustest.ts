const step0 = "initial"

const step1 = {
  "reason": {
    "component": "SelectPage",
    "id": "selectPage-PostCodeDemo",
    "event": "onClick"
  },
  "txLens": [
    [
      "state.focusOn(pageSelection)",
      [
        {
          "pageName": "PostCodeDemo",
          "firstTime": true,
          "pageMode": "edit"
        }
      ]
    ]
  ]
}

const step2 = {
  "reason": {
    "component": "ModalButton",
    "id": "search",
    "event": "onClick"
  },
  "txLens": [
    [
      "state.focusOn(pageSelection)",
      [
        {
          "pageName": "PostCodeDemo",
          "firstTime": false,
          "pageMode": "edit"
        },
        {
          "pageName": "PostCodeSearch",
          "firstTime": true,
          "pageMode": "edit",
          "focusOn": [
            "PostCodeDemo",
            "postcode"
          ],
          "copyOnClose": [
            {
              "from": [
                "{basePage}",
                "postcode",
                "addressResults",
                "line1"
              ],
              "to": [
                "{basePage}",
                "main",
                "line1"
              ]
            },
            {
              "from": [
                "{basePage}",
                "postcode",
                "addressResults",
                "line2"
              ],
              "to": [
                "{basePage}",
                "main",
                "line2"
              ]
            },
            {
              "from": [
                "{basePage}",
                "postcode",
                "addressResults",
                "line3"
              ],
              "to": [
                "{basePage}",
                "main",
                "line3"
              ]
            },
            {
              "from": [
                "{basePage}",
                "postcode",
                "addressResults",
                "line4"
              ],
              "to": [
                "{basePage}",
                "main",
                "line4"
              ]
            },
            {
              "from": [
                "{basePage}",
                "postcode",
                "search"
              ],
              "to": [
                "{basePage}",
                "main",
                "postcode"
              ]
            }
          ]
        }
      ]
    ],
    [
      "I.focus?(PostCodeDemo).focus?(postcode).focus?(search)",
      null
    ]
  ]
}

const step3 = {
  "reason": {
    "component": "Input",
    "id": "root.search",
    "event": "onChange"
  },
  "json": "123",
  "lens": "I.focus?(PostCodeDemo).focus?(postcode).focus?(search)"
}

const step4 = {
  "reason": {
    "component": "Table",
    "id": "root.searchResults",
    "event": "onClick",
    "comment": "selected row 0"
  },
  "txLens": [
    [
      "I.focus?(PostCodeDemo).focus?(postcode).focus?(addressResults)",
      {
        "line1": "4 Privet drive",
        "line2": "Little Whinging",
        "line3": "Surrey",
        "line4": "England"
      }
    ]
  ]
}

const step5 = {
  "reason": {
    "component": "ModalCommit",
    "id": "commit",
    "event": "onClick"
  },
  "txLens": [
    [
      "state.focusOn(pageSelection)",
      [
        {
          "pageName": "PostCodeDemo",
          "firstTime": false,
          "pageMode": "edit"
        }
      ]
    ],
    [
      "I.focus?(PostCodeDemo).focus?(main).focus?(line1)",
      "4 Privet drive"
    ],
    [
      "I.focus?(PostCodeDemo).focus?(main).focus?(line2)",
      "Little Whinging"
    ],
    [
      "I.focus?(PostCodeDemo).focus?(main).focus?(line3)",
      "Surrey"
    ],
    [
      "I.focus?(PostCodeDemo).focus?(main).focus?(line4)",
      "England"
    ],
    [
      "I.focus?(PostCodeDemo).focus?(main).focus?(postcode)",
      "123"
    ]
  ]
}

const step6 = {
  "reason": {
    "component": "RestButton",
    "id": "save",
    "event": "onClick"
  },
  "json": [
    {
      "restAction": "create",
      "name": "PostCodeDemo_PostCodeMainPageRestDetails"
    }
  ],
  "lens": "I.focusOn(restCommands)"
}

const allSteps = [step0,step1,step2,step3,step4,step5,step6]