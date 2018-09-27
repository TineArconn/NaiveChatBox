'use strict';

let naiveChatboxApp = angular.module('naiveChatboxApp', [
    'chatbox'
]);

var chatbox = angular.module('chatbox', []);
chatbox.controller('chatboxCtrl', ['$scope',
    ($scope) => {

        $scope.botName = 'Steve, at your service';
        if (localStorage.getItem('naivechatbox-interactions') === null) {
            $scope.interactions = [];            
        } else {
            $scope.interactions = JSON.parse(localStorage.getItem('naivechatbox-interactions'));
        }        

        let botResponse = (newRequest) => {
            $scope.interactions.push({
                text: newRequest,
                isRequest: false
            });
            localStorage.setItem('naivechatbox-interactions', JSON.stringify($scope.interactions));
        }

        $scope.addRequest = () => {
            let newRequest = $scope.newRequest.trim();
            if (!newRequest.length) {
                return;
            }
            $scope.interactions.push({
                text: newRequest,
                isRequest: true
            });
            $scope.newRequest = '';
            botResponse(newRequest, $scope.interactions.length);
        };

        $scope.editRequest = (interaction) => {
            $scope.newRequest = interaction.text;
        };
    }
]);