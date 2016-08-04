'use strict';

const paperMixing = () => {
  let canvas = document.getElementById('myCanvas');
  paper.setup('myCanvas');

  let bowl = new Path.Arc({
    from: [view.center.x-50,view.center.y],
    through: [view.center.x,view.center.y+50],
    to: [view.center.x+50,view.center.y],
    strokeColor: '#B3B2AD',
    fillColor: '#E6F7FC'
  });
  bowl.closed = true;

 let spine = new Path({x:view.center.x-50, y:view.center.y-40});
  spine.add({x:view.center.x-30, y:view.center.y+30});
  spine.strokeColor = '#6EF5BF';
  spine.strokeWidth = 2;


 let innerItem = new Path.Arc({
   from: [view.center.x-40,view.center.y+30],
   through: [view.center.x,view.center.y+50],
   to: [view.center.x+40,view.center.y+30],
   strokeColor: '#EDE73B',
   fillColor: '#EDE73B'
 });
  innerItem.closed = true;

  let amount = 3;
  let height = 5;
  let wave = new Path();
  wave.add(view.center.x-40,view.center.y+30);
  wave.add(view.center.x-20,view.center.y+30);
  wave.add(view.center.x-5,view.center.y+30);
  wave.add(view.center.x+20,view.center.y+30);
  wave.add(view.center.x+40,view.center.y+30);

 wave.fillColor = '#EDE73B';

 let group = new Group();
 let stir = new Path()

  view.onFrame = function(event) {
   for (let i = 1; i <= amount; i++) {
 	   let segment = wave.segments[i];
     let sinus = Math.sin(event.time * 4 + i);
     segment.point.y = sinus * height+105;
   };
   var sinus = Math.sin(event.time*2)*0.7;
    spine.segments[1].point.x += sinus ;

 };


};

const addHandlers = () => {
  paperMixing();
};

module.exports = {
  addHandlers,
};
