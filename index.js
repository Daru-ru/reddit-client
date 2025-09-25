async function renderSubreddit(name) {
      
      document.querySelector('.loaded-container').innerHTML = '';
      document.querySelector('.errorInput-container').innerHTML = '';
      document.querySelector('.load-container').innerHTML = 'Loading...';

      try {
      const subredditPostHTML = await getSubreddit(name);

      document.querySelector('.subReddit-wrap').innerHTML += subredditPostHTML;
      document.querySelector('.load-container').innerHTML = '';
      document.querySelector('.loaded-container').innerHTML = "Loaded"

      document.querySelectorAll('.three-dots-icon').forEach((opt) => {
        opt.addEventListener('click', () => {
          const optName = opt.dataset.name;

          displayOpt(`.opt-${optName}`);
        })
      })

      document.querySelectorAll('.refresh-subreddit').forEach((button) => {
        button.addEventListener('click', () => {
          const subredditName = button.dataset.name;

          refresh(subredditName);
        })
      })

      document.querySelectorAll('.delete-subreddit').forEach((button) => {
        button.addEventListener('click', () => {
          const subredditName = button.dataset.name;
          deleteSubreddit(subredditName);
        })
        
      })
    
      }

      catch (e) {
        console.log(e)
        if(e == "TypeError: Cannot read properties of undefined (reading 'children')") {
          console.log('there is no such a subreddit')
          document.querySelector('.errorInput-container').innerHTML = 'There is no such a subreddit';
          document.querySelector('.load-container').innerHTML = '';
        } else if(e == "TypeError: Failed to fetch") {
          console.log('internet error')
          document.querySelector('.errorInput-container').innerHTML = 'Internet error';
          document.querySelector('.load-container').innerHTML = '';
        } else {
          document.querySelector('.errorInput-container').innerHTML = 'error';
          document.querySelector('.load-container').innerHTML = '';
        }
      }
      
    }

    async function getSubreddit(name) {
      const res = await fetch(`https://www.reddit.com/r/${name}.json`);
      const data = await res.json();
      const subredditPost = await data.data.children;

      let subredditHTML = '';
      
      subredditHTML += `
        <div class="subReddit name-${name}">
          <div class="subReddit-top">
            <p class="subReddit-name">/r/${name}</p>
            <div class="subReddit-opt">
              <img class="three-dots-icon" src="./img/three-dots-vertical-svgrepo-com.svg" data-name = "${name}">
              <div class="subReddit-opt-popUp opt-${name}" >
                <p class="refresh-subreddit" data-name='${name}'>Refresh</p>
                <p class="delete-subreddit" data-name='${name}'>Delete</p>
              </div>
            </div>
          </div>
          <div class="subReddit-post-wrap">
      `
      

      await subredditPost.forEach((post) => {
        subredditHTML += `
          <div class="subReddit-post">
            <div class="subReddit-post-left">
              <img class="arrow-down-icon" src="./img/arrow-down-angle-svgrepo-com.svg">
              <p>${post.data.ups}</p>
            </div>
            <div class="subReddit-post-right">
              <p class="post-title">${post.data.title}</p>
              <p class="post-user">u/${post.data.author}</p>
            </div>
          </div>
        `;
      })

      subredditHTML += `
          </div>
        </div>
      `;

      return subredditHTML
    }

    document.querySelector('.add-block-button')
        .addEventListener('click', () => {
          const subredditName = document.querySelector('.add-block-input').value;
          renderSubreddit(subredditName);


          document.querySelector('.add-block-input').value = '';
        })

      document.querySelector('.add-button')
        .addEventListener('click', () => {
          if(document.querySelector('.add-button').classList.contains('add-button-on')){
            document.querySelector('.plus-popUp').classList.remove('plus-popUp-display');
            document.querySelector('.add-button').classList.remove('add-button-on');
          } else {
            document.querySelector('.plus-popUp').classList.add('plus-popUp-display');
            document.querySelector('.add-button').classList.add('add-button-on');
          }
          
        })

      async function refresh(name) {
        try {
          document.querySelector(`.name-${name}`).innerHTML = '<p class="refresh">Refreshing...</p>';
          const subredditPostHTML = await getSubreddit(name);

          document.querySelector(`.name-${name}`).innerHTML = subredditPostHTML;

          document.querySelectorAll('.three-dots-icon').forEach((opt) => {
            opt.addEventListener('click', () => {
              const optName = opt.dataset.name;

              displayOpt(`.opt-${optName}`);
            })
          })

          document.querySelectorAll('.refresh-subreddit').forEach((button) => {
            button.addEventListener('click', () => {
              const subredditName = button.dataset.name;

              refresh(subredditName);
            })
          })
        }

        catch (e) {
          if(e == "TypeError: Cannot read properties of undefined (reading 'children')") {
            console.log('there is no such a subreddit')
            document.querySelector('.errorInput-container').innerHTML = 'There is no such a subreddit';
            document.querySelector('.load-container').innerHTML = '';
          } else if(e == "TypeError: Failed to fetch") {
            console.log('internet error')
            document.querySelector('.errorInput-container').innerHTML = 'Internet error';
            document.querySelector('.load-container').innerHTML = '';
          } else {
            document.querySelector('.errorInput-container').innerHTML = 'error';
            document.querySelector('.load-container').innerHTML = '';
          }
        }
      }

      function deleteSubreddit(name) {
        document.querySelector(`.name-${name}`).remove();
      }
      

        function displayOpt(optName) {
          const optHTML = document.querySelector(`${optName}`)

          if(optHTML.classList.contains('display')) {
            optHTML.classList.remove('display')
          } else {
            optHTML.classList.add('display')
          }
        };

        document.querySelectorAll('.three-dots-icon').forEach((opt) => {
          opt.addEventListener('click', () => {
            console.log(`.opt-${optName}`);

            displayOpt(`.opt-${optName}`);
          })
        })

          