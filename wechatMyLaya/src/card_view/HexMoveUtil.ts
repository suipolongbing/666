/*
* name;
*/
class HexMoveUtil {
    static SelectLocation(characterIndex, action) {
        switch (characterIndex) {
            case 0:
                if (action == 1) {
                    return {consume: 1, moveArray: [1, 2, 3, 4]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 1:
                if (action == 1) {
                    return {consume: 1, moveArray: [0, 2, 5]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 2, 3, 4, 5, 6, 7]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 2, 3, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 2:
                if (action == 1) {
                    return {consume: 1, moveArray: [0, 1, 3, 5, 6, 7]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 3, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 3, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 3:
                if (action == 1) {
                    return {consume: 1, moveArray: [0, 2, 4, 7, 8, 9]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 2, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 4, 5, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 4:
                if (action == 1) {
                    return {consume: 1, moveArray: [0, 3, 9]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 2, 3, 7, 8, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 5, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 5:
                if (action == 1) {
                    return {consume: 1, moveArray: [1, 2, 6]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 2, 3, 6, 7]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 4, 6, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 6:
                if (action == 1) {
                    return {consume: 1, moveArray: [2, 5, 7]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 2, 3, 5, 7, 8]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 4, 5, 7, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 7:
                if (action == 1) {
                    return {consume: 1, moveArray: [2, 3, 6, 8]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 1, 2, 3, 4, 5, 6, 8, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 4, 5, 6, 8, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 8:
                if (action == 1) {
                    return {consume: 1, moveArray: [3, 7, 9]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 2, 3, 4, 6, 7, 9]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 4, 5, 6, 7, 9]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
            case 9:
                if (action == 1) {
                    return {consume: 1, moveArray: [3, 4, 8]};
                }
                else if (action == 2) {
                    return {consume: 2, moveArray: [0, 2, 3, 4, 7, 8]};
                }
                else if (action == 3) {
                    return {consume: 3, moveArray: [0, 1, 2, 3, 4, 5, 6, 7, 8]};
                }
                else if (action == 0) { //受到'止步'限制
                    return {consume: 0, moveArray: []};
                }
                break;
        }
    }
}