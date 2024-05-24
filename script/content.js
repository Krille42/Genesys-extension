(function() {

   let agents = []
   

   setTimeout(() => {

      let myDocument = GetInnerDocument()
      
      setInterval(() => {

         myDocument.getElementsByClassName("widget-container").item(0).style.height = "auto";
         myDocument.getElementsByClassName("widget-container").item(1).style.height = "auto";
         myDocument.getElementsByClassName("widget-container").item(3).style.height = "180px";

         myDocument.getElementsByClassName("analytics-ui-widget-display-footer").item(0).style.marginTop = "-250px";
         myDocument.getElementsByClassName("analytics-ui-widget-display-footer").item(1).style.marginTop = "-250px";

         myDocument.getElementsByClassName("grid-sidebar").item(0).style.width = "400px";

         myDocument.getElementsByClassName("grid-container").item(0).style.gridGap = "0";

         myDocument.getElementsByClassName("main-grid").item(0).style = "padding: .5em !important; grid-gap: .5em;"


         for(i = 0; i < myDocument.getElementsByClassName("row-label").length-2; i++) {

            if(myDocument.getElementsByClassName("row-label").item(i).title.includes("(")) {

               myDocument.getElementsByClassName("row-label").item(i).getElementsByClassName("row-label-text").item(0).innerHTML = myDocument.getElementsByClassName("row-label").item(i).getElementsByClassName("row-label-text").item(0).innerHTML.split(" (")[0]

            }

            if(myDocument.getElementsByClassName("data-cell").item(2*i).children.item(0).innerHTML.includes("-")) {

               myDocument.getElementsByClassName("row-label").item(i).style.display = "none"
               myDocument.getElementsByClassName("data-cell").item(2*i).style.display = "none"
               myDocument.getElementsByClassName("data-cell").item(2*i+1).style.display = "none"

            }else {

               myDocument.getElementsByClassName("row-label").item(i).style.display = "initial"
               myDocument.getElementsByClassName("data-cell").item(2*i).style.display = "initial"
               myDocument.getElementsByClassName("data-cell").item(2*i+1).style.display = "initial"

            }

         }

         agents = []

         for (i = 0; i < myDocument.getElementsByClassName("dt-section-body").item(myDocument.getElementsByClassName("dt-section-body").length-1).getElementsByClassName("agent").length; i++) {

            let agentName = myDocument.getElementsByClassName("dt-section-body").item(myDocument.getElementsByClassName("dt-section-body").length-1).getElementsByClassName("agent").item(i).getElementsByTagName("a").item(0).innerHTML.toString()

            if(agentName.includes("(")) {

               agentName = agentName.split(" (")[0]
      
               myDocument.getElementsByClassName("dt-section-body").item(myDocument.getElementsByClassName("dt-section-body").length-1).getElementsByClassName("agent").item(i).getElementsByTagName("a").item(0).innerHTML = agentName
      
            }

            if(i < 1) {

               agents[i] = myDocument.getElementsByClassName("grid-sidebar").item(0).getElementsByClassName("dt-cell-value").item(2).innerHTML

            }else {

               agents[i+1] = agentName

            }
            
         }

         myDocument.getElementsByClassName("last-grid-row").item(0).style = "margin-bottom: 0 !important"
         myDocument.getElementsByClassName("last-grid-row").item(1).style = "margin-bottom: 0 !important"

      }, 1000)
      
      

   }, 10000)

	setInterval(() => {

      let myDocument = GetInnerDocument()

		let sRoot = document.getElementsByTagName("gux-toggle").item(0).shadowRoot
		let HTMLEl = document.createElement("div")
      HTMLEl.innerHTML = sRoot.innerHTML

		if ((HTMLEl.getElementsByClassName("gux-toggle-slider").item(0).ariaChecked != "true" || HTMLEl.getElementsByClassName("gux-toggle-slider").item(0).ariaDisabled == "true") && agents.length < 3 && agents[0].includes("Idle")) {

         if(!document.getElementById("redBox")) {

            const node = document.createElement("div");
            node.style = "inset: 0; position: absolute; z-index: 35; background-color: rgba(255, 0, 0, 0.5); animation-name: redFlash; animation-duration: .5s; animation-iteration-count: infinite;"
            node.id = "redBox"
            document.body.appendChild(node)

            document.getElementById("redBox").addEventListener("click", () => {

               document.body.removeChild(document.getElementById("redBox"))

            })

         }

      }

   },30000)

   const GetInnerDocument = () => {

      let myDocument = document.getElementsByTagName("iframe")

      for (i = 0; i < myDocument.length; i++) {

         if(document.getElementsByTagName("iframe").item(i).title == 'Analytics UI') {

            myDocument = document.getElementsByTagName("iframe").item(i).contentDocument

            break

         }

      }

      return myDocument

   }

})();

