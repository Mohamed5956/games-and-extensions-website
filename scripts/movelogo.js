        //function easy
        function easy() {
            document.getElementById('circle')
                 .style.animationDuration = '20s';
            document.getElementById('circle')
                .className = 'crcl';
        }
  
       //function medium
        function medium() {
            document.getElementById('circle')
                .style.animationDuration = '15s';
            document.getElementById('circle')
                .className = 'crcl';
        }
  
       //function hard
        function hard() {
            document.getElementById('circle')
                .style.animationDuration = '12s';
            document.getElementById('circle')
                .className = 'crcl';
        }
  
        let cnt = 0;
  
        // Function to count the number of taps
        function count() {
            cnt = parseInt(1) + parseInt(cnt);
            var scr = document.getElementById('score');
            scr.innerHTML = cnt;
        }
  
        // Restart the game by refreshing the page
        function restart() {
            window.location.reload();
        }

        //back to Home Page
        function BacktoHome(){
            window.location.assign("http://127.0.0.1:5500/index.html")
          }