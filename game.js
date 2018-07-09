require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings');
require('main');

var io = require('weapp.socket.io.js');
// var url = 'ws://127.0.0.1:8081';  // Localhost
var url = 'ws://119.28.130.88:8081'   // Remote host
var socket = io(url);

// When client connects with socket
socket.on('connect', res => {
    console.log('Connection establisehd with server.');
    var sessionID = wx.getStorageSync('sessionID');
    // SessionID stored in local
    if(sessionID) {
        wx.checkSession({
            // Session key is not timed out
            success: () => {
                console.log('Verifying sessionID...');
                socket.emit('user-verify', sessionID);
            },
            // Session key is timed out
            fail: () => {
                console.log('Session key expires.');
                console.log('User is logging in...');
                userLogin();
            }      
        });
    }
    // No sessionID is stored in local
    else {
        console.log('User is logging in...');
        userLogin();
    }
});

// When client receieves uuid
socket.on('login-success', res => {
    console.log('Received sessionID from server.');
    wx.setStorageSync('sessionID', res);
});

// When client is verified
socket.on('verify-end', res => {
    console.log(res);
    // If verification is unsuccessful (Server restart, incorrect uuid)
    if(res == 'Verification unsuccessful.')
        userLogin();
});

function userLogin() {
    console.log('Attempting to log in...');
    wx.login({
        success: res => {
            if(res.code){
                socket.emit('login', res.code);
                console.log('Login successful!');
            }
        },
        fail: err => {
            console.log('Failed to log in.');
            console.log('Error: ' + err);
        }
    });
}

window.initPlayerData = function(callback) {
    var player = new Object();
    socket.emit('initPlayer', wx.getStorageSync('sessionID'), res => {
        player.chickenCount = res[0].chickenCount;
        player.moneyCount = res[0].moneyCount;
        callback(player);
    });
}

window.sendChicken = function(chicken) {
    socket.emit('sendChicken', chicken);
}

// Function for user to manually disconnect socket
function userDisconnect() {
    socket.close();
}