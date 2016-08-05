'use strict';

const paperGrill = () => {
  let canvas = document.getElementById('myCanvasGrill');
  paper.setup('myCanvasGrill');
    let unit = 50;
    let bottomPlate = new Path(new Point(3*unit,5*unit), new Point(5*unit,5*unit), new Point(7*unit,5*unit));
    bottomPlate.strokeColor = 'black';


    //drawing bottom curve
    let center1 = new Point(5*unit, 5*unit);
    let vector = new Point(2*unit, 0);
    let bottomCurve = new Path();
    vector.angle = -1;
    for(let i = 0; i <= 180; i ++){
      vector.angle += 1;
      let pointOnCurve = center1 + vector;
     bottomCurve.add(pointOnCurve);
    }
    bottomCurve.strokeColor = 'black';
    bottomCurve.strokeWidth = .1*unit;
    bottomCurve.smooth();

    //Drawing handle bar on righ
    let handlebarRight = new Path();
    let vecHandleRight = new Point(2*unit, 0);
    vecHandleRight.angle += 5;
    let handlePoint1 = center1 + vecHandleRight;
    handlebarRight.add(handlePoint1);
    let handlePoint2 = handlePoint1 + [.3*unit,0];
    handlebarRight.add(handlePoint2);
    handlebarRight.strokeColor = 'black';
    let nobRight = new Path.Circle(handlePoint2, .1*unit);
    nobRight.fillColor = 'black';

    //Drawing handle bar on left
    let handlebarLeft = new Path();
    let vecHandleLeft = new Point(2*unit, 0);
    vecHandleLeft.angle += 175;
    let handlePoint3 = center1 + vecHandleLeft;
    handlebarLeft.add(handlePoint3);
    let handlePoint4 = handlePoint3 + [-.3*unit,0];
    handlebarLeft.add(handlePoint4);
    handlebarLeft.strokeColor = 'black';
    let nobLeft = new Path.Circle(handlePoint4, .1*unit);
    nobLeft.fillColor = 'black';

    //Drawing stand on right
    let standRight = new Path();
    let vecStandRight = new Point(2*unit, 0);
    vecStandRight.angle += 60;
    let standPoint1 = center1 + vecStandRight;
    standRight.add(standPoint1);
    let vecStandDirection1 = new Point(2*unit, 0);
    vecStandDirection1.angle += 60;
    let standPoint2 = standPoint1 + vecStandDirection1;
    standRight.add(standPoint2);
    standRight.strokeColor = 'black';

    //Drawing stand on left
    let standLeft = new Path();
    let vecStandLeft = new Point(2*unit, 0);
    vecStandLeft.angle += 120;
    let standPoint3 = center1 + vecStandLeft;
    standLeft.add(standPoint3);
    let vecStandDirection2 = new Point(2*unit, 0);
    vecStandDirection2.angle += 120;
    let standPoint4 = standPoint3 + vecStandDirection2;
    standLeft.add(standPoint4);
    standLeft.strokeColor = 'black';

    //Drawing roller on left stand
    let rollerCenter = standPoint4 - vecStandDirection2 /2 * .3;
    let roller = new Path.Circle(rollerCenter, .3*unit);
    let rollerCopy = roller.clone();
    let rollerCC = roller.clone();
    rollerCopy.scale(.7);
    roller.fillColor = 'black';
    rollerCopy.strokeColor= 'white';
    rollerCopy.strokeWidth = .05*unit;

    //racks
    let rack = new Path.Rectangle(0, 0, .3*unit, .1*unit);
    rack.fillColor = 'black';

    let rackSymbol = new Symbol(rack);

    for (let i = 0; i < 7; i ++) {
      let rackPosition = new Point((3.5+i/2)*unit, 4.9*unit);
      rackSymbol.place(rackPosition);
    }

    //draw steak on rack
    let steak = new Path.Rectangle(3.7*unit, 4.65*unit, 2.5*unit, 0.2*unit);
    steak.fillColor = '#ff7777';


    //Drawing hanging bar between stands
    let bar = new Path();
    let barPointRight = standPoint1 + vecStandRight/2*0.9;
    let barPointLeft = standPoint3 + vecStandLeft/2*0.9;
    bar.add(barPointRight, barPointLeft);
    bar.strokeColor = 'black';

    //Drawing top plate
    let topPlate = new Path();
    let topVector = new Point(2*unit, 0);
    topVector.angle = -145;
    let topPlateRightPoint = new Point(7*unit,5*unit);
    let topPlateLeftPoint = topPlateRightPoint + topVector *2;
    topPlate.add(topPlateRightPoint, topPlateLeftPoint);
    topPlate.strokeColor = 'black';

    //drawing top curve
    let center2 =  topPlateRightPoint + topVector;
    let topCurve = new Path();
    let topVectorCopy = topVector.clone();
    topVector.angle += -1;
    for(let i = 0; i <= 180; i ++){
      topVector.angle += 1;
      let pointOnTopCurve = center2 + topVector;
     topCurve.add(pointOnTopCurve);
    }
    topCurve.strokeColor = 'black';
    topCurve.smooth();
    let topCurveCopy = topCurve.clone();
    topCurveCopy.scale(0.9);
    topCurve.strokeWidth = .1*unit;

    //top knob on middle point of top curve
    topVectorCopy.angle +=90;
    let stem = new Path();
    let middlePoint = center2 + topVectorCopy;
    let stemPoint = middlePoint + topVectorCopy/2*0.3;
    stem.add(middlePoint, stemPoint);
    stem.strokeColor = 'black';
    stem.strokeWidth = 0.05*unit;
    let barSymbol = rackSymbol.place(stemPoint).rotate(35).scale(1.5);

    //joint roller for top and bottom curve
    let joint = new Path.Circle(topPlateRightPoint, 0.15*unit);
    joint.fillColor = 'white';
    joint.strokeColor = 'black';
    joint.strokeWidth = 0.05*unit;



    // smoke animation
    let amount = 5;
    let width = 0.05*unit;
    let smokePath = new Path({
      strokeColor:[0.8],
      strokeWidth:0.08*unit,
      strokeCap:'round'
    })

    for(let i = 0; i <= amount; i++) {
      smokePath.add(new Point(1, i / amount) * unit);
    }
    smokePath.selected = true;
    let smokeSymbol = new Symbol(smokePath);
    for (let i = 0; i < 7; i++) {
    let smokeSize = Math.random()*2;
    let smokeCenter = new Point((i/2)*unit, 4.9*unit);
    let placedSymbol = smokeSymbol.place(smokeCenter -[6.5*unit,0.9*unit]);
    // 	placedSymbol.scale(smokeSize);
    }


    //group top cover elements
    let topCoverGroup = new Group([topPlate,topCurve,topCurveCopy, stem, barSymbol, joint]);
    topCoverGroup.fillColor = 'white';

    let rotatingAngle = 0.1;
    function onFrame(event) {
      //oscillation animation
      topCoverGroup.rotate(rotatingAngle, topPlateRightPoint);
      if(event.count % 300 == 0) {
          rotatingAngle *= -1;
      }

      // grilling smoke
    for (let i = 0; i <= amount; i++) {
    let segment = smokePath.segments[i];
    let sinus = Math.sin(event.time*5  + i);
    segment.point.x = sinus * width + 500;
      }
      smokePath.smooth();
    }
 };

const addHandlers = () => {
  paperGrill();
};

module.exports = {
  addHandlers,
};
