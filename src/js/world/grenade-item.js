function GrenadeItem(x, y){
    this.x = x;
    this.y = y;

    this.render = function(){
        save();
        translate(x, y);

        drawImage(whiteHalo, -HALO_SIZE_HALF, -HALO_SIZE_HALF);

        R.fillStyle = 'red';
        fillRect(-GRENADE_RADIUS, -GRENADE_RADIUS, GRENADE_RADIUS_2, GRENADE_RADIUS_2);

        // Arrow
        R.fillStyle = '#fff';
        beginPath();
        moveTo(-ARROW_SIZE / 2, -ARROW_SIZE / 2 + GRENADE_ARROW_Y_OFFSET);
        lineTo(ARROW_SIZE / 2, -ARROW_SIZE / 2 + GRENADE_ARROW_Y_OFFSET);
        lineTo(0, GRENADE_ARROW_Y_OFFSET);
        fill();

        restore();
    };

    this.cycle = function(){
        if(dist(this, P) < GRENADE_PICKUP_RADIUS && !this.pickedUp){
            if(P.grenades >= PLAYER_MAX_GRENADES){
                var s = nomangle('inventory.full');
                if(P.saying[0] != s){
                    P.say(s);
                }
            }else{
                var m = this;
                T(function(){
                    remove(G.cyclables, m);
                    remove(G.renderables, m);
                }, 0);

                P.grenades++;

                this.pickedUp = true;

                pickupSound.play();

                P.say([pick([
                    nomangle('Here\'s a breakpoint!'),
                    nomangle('You found a breakpoint!'),
                    nomangle('That\'s a breakpoint!')
                ]), nomangle('Press SPACE to throw it')]);
            }
        }
    };
}
