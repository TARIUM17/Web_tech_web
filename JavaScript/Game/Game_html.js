export const game_html = `
<div id="main_block">
    <div class="block_Game">
        <div class="game">
        
            <div id="maze"></div>
        
            <div class="panel">
                <div class="controls">
                    <button id="upBtn" class="up">Up</button>
                    <button id="downBtn" class="down">Down</button>
                    <button id="leftBtn" class="left">Left</button>
                    <button id="rightBtn" class="right">Right</button>
    
    
                </div>
            
                    <button id="startBtn" class="start">START</button>
                    <button id="resetBtn" class="reset">RESET</button>
            
                <div class="info">
                    Max: <span id="maxMoves">20</span><br>
                    Commands: <span id="currentMoves">0</span>
                </div>
            
                <div id="commands"></div>
            </div>
        
        </div>
    </div>
</div>
`;