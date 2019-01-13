
		var map = L.map('map').setView([25.886319, 17.201510], 3);
	    var gl = L.mapboxGL({
	        attribution: '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
	        accessToken: 'not-needed',
	    	style: 'https://maps.tilehosting.com/c/a761b693-6e69-47a8-86ed-80c04a3546f3/styles/streets/style.json?key=rGrAfZbuIGB8zzQBJ6BY'
	    }).addTo(map);

	    function onCountryMouseOut(e){
		
		//	$("#countryHighlighted").text("No selection");
		 
			var countryName = e.target.feature.properties.name;
			var countryCode = e.target.feature.properties.iso_a2;
		//callback when mouse exits a country polygon goes here, for additional actions
			var layer = e.target;
		 
			layer.setStyle({
				fillColor: "#E3E3E3",
				weight: 0,
				opacity: 0.4,
				color: 'white',
				fillOpacity: 0.3
			});
			
		}



		function onCountryClick(e){
		//callback for clicking inside a polygon
		
			generateNews(e.target.feature.properties.NAME, e.target.feature.properties.ISO2);
			
		}

		function onCountryHighLight(e){
			var layer = e.target;
		 
			layer.setStyle({
				weight: 4,
				color: '#0000cc',
				fillColor: '#0000cc',
				dashArray: '',
				fillOpacity: 0.4
			});
		 
			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}
		 
		//callback when mouse enters a country polygon goes here, for additional actions
		}
	   

	    function style(feature) {
			return {
				fillColor: "#E3E3E3",
				weight: 0,
				opacity: 0.4,
				color: 'white',
				fillOpacity: 0.3
			};
		}

		function onEachFeature(feature, layer){
			layer.on({
				click : onCountryClick,
				mouseover : onCountryHighLight,
				mouseout : onCountryMouseOut
			});
		}

		//var borderLayer = L.geoJson(borders).addTo(map);

		var borderLayer = L.geoJson(borders, {
			onEachFeature: onEachFeature,
			style : style
		}).addTo(map);
		
		var sidebar = L.control.sidebar('sidebar', {
		    position: 'left'
		});

		
		//sidebar.setContent(document.createElement("H1").appendChild(document.createTextNode("News")));
		//sidebar.setContent(document.createElement("H1").appendChild(document.createTextNode("YO SOMWAN")));
		map.addControl(sidebar);
		setTimeout(function () {
		    sidebar.show();
		}, 500);