// DOM読み込み後
console.log("DEMO");

function demoTest() {
  console.log("demoTest");
}
document.addEventListener('DOMContentLoaded', function (event) {
  console.log("loaded");
  const option = {
    waitTime: 2000,
    showFadeTime: 300,
    hideFadeTime: 300,
    autoStart: false,
    progressBar: true,
    progressBarParent: '#demo-cover',
    events: [
      'mousemove',
      'click',
      'scroll',
    ],
    on: {
      init: function (e) {
        document.getElementById('scsaver-wait-time').innerText = this.settings.waitTime;
        document.getElementById('scsaver-progress-bar').innerText = this.settings.progressBar;
        document.getElementById('scsaver-show-time').innerText = this.settings.showFadeTime;
        document.getElementById('scsaver-hide-time').innerText = this.settings.hideFadeTime;

        this.settings.events.forEach(function (event) {
          let text = event;
          if ('' !== document.getElementById('scsaver-release-events').innerText) {
            text = ', ' + text;
          }

          document.getElementById('scsaver-release-events').innerText += text;
        });

        document.getElementById('scsaver-event-interval').innerText = this.settings.doInterval;
      },
      // showStart: function(e) {
      //   console.log("showStart");
      // },
      // hideStart: function(e) {
      //   console.log("hideStart");
      // },
    }
  }

  const scsaver = new Scsaver('#scsaver', option);

  const scsaverStateTextElm = document.getElementById('demo-control-enabled-state');
  const scsaverToggleElm = document.getElementById('scsaver-toggle');
  scsaverToggleElm.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.dataset.scsaverEnabled === 'true') {
      scsaver.disabled();
      e.target.dataset.scsaverEnabled = 'false';
      // scsaverStateTextElm.innerText = 'Enabled';
    } else {
      scsaver.enabled();
      e.target.dataset.scsaverEnabled = 'true';
      // scsaverStateTextElm.innerText = 'Disabled';
    }
  });
});