export const game_html = `
<div class="block_Game">
    <div class="game">
    
        <div id="maze"></div>
    
        <div class="panel">
            <div class="controls">
                <button class="up" onclick="addCommand('up')">Up</button>
                <button class="down" onclick="addCommand('down')">Down</button>
                <button class="left" onclick="addCommand('left')">Left</button>
                <button class="right" onclick="addCommand('right')">Right</button>
            </div>
        
            <button class="start" onclick="startGame()">START</button>
            <button class="reset" onclick="resetGame()">RESET</button>
        
            <div class="info">
                Max: <span id="maxMoves">20</span><br>
                Commands: <span id="currentMoves">0</span>
            </div>
        
            <div id="commands"></div>
        </div>
    
    </div>
</div>
`;