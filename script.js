

function stocksearch(){
    window.location.assign("https://www.google.com/finance/")
  }


  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
      }
  };
  
  var table=document.querySelector('table');
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', check);


  let input=document.querySelector('input');
  input.addEventListener('keyup', (e) => {
    if(e.keyCode==13){
        check();
    }
  })
  let stocks=["NIFTY 500","NIITLTDEQN","JMFINANCILEQN","RVNLEQN","BANKBARODAEQN","IRBEQN","BRITANNIAEQN","FINPIPEEQN","GESHIPEQN","UNIONBANKEQN","TRIDENTEQN","TATAMTRDVREQN","SUPREMEINDEQN","EASEMYTRIPEQN","BANKINDIAEQN"];

  function check(){
    let a=false;
    stocks.forEach(function(e){
        if(e==input.value){
            a=true;
            return;
        }
    })
    if(a){
        getList();
    }
    else{
        table.innerHTML="Please enter correct stock name.";
    }
  }
  function getList(){
    table.innerHTML+=`
                  <tr>
                    <th>Symbol</th>
                    <th>Indentifier</th>
                    <th>Open</th>
                    <th>Day High</th>
                    <th>Day Low</th>
                    <th>Last Price</th>
                    <th>Last Update Time</th>
                    <th>Year High</th>
                    <th>Year Low</th>
                  </tr>
    `
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%20500&Identifier=${searchInputTxt}`, options)
      .then(response => response.json())
      .then((data)=>{
        data.forEach((item)=> {
          table.innerHTML+= `
            <td>${item.symbol}</td>
            <td>${item.identifier}</td>
            <td>${item.open}</td>
            <td>${item.dayHigh}</td>
            <td>${item.dayLow}</td>
            <td>${item.lastPrice}</td>
            <td>${item.lastUpdateTime}</td>
            <td>${item.yearHigh}</td>
            <td>${item.yearLow}</td>
          `;
        })
    })
      .catch(error => console.error(error));
  }