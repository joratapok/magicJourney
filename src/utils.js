export function drawStatusText(context, player) {
    context.font = '20px Helvetica';
    context.fillText('Active state ' + player.currentState.state, 10, 40)
}
