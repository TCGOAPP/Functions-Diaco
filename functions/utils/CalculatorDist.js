'use strict'

class CalculatorDist{
  static init (){
    return new CalculatorDist()
  }
  /**
   * mMetodo para calculo de distancia entre dos puntos de coordenadas
   * @param {Object} $Coords1  cordenadas x y primer punto 
   * @param {Object} $Coords2 coordenadsa de segundo punto
   * @return {Number} retorna  la distancia entre los puntos en kilometros 
   */
  getDistanceByCoords($Coords1,$Coords2){
  try {
    const $x1 = parseFloat($Coords1["x"]);
    const $y1 = parseFloat($Coords1["y"]);
    const $x2 = parseFloat($Coords2["x"]);
    const $y2 = parseFloat($Coords2["y"]);
    const $mlat1 = this.deg2rad($x1);
    const $mlat2 = this.deg2rad($x2);
    const $R = 6371;
    const $diferenciaLatitud = this.deg2rad($x2-$x1);
    const $diferenciaLongitud = this.deg2rad($y2-$y1);
    const $val1 = Math.pow(Math.sin($diferenciaLongitud/2),2)+Math.pow(Math.sin($diferenciaLatitud/2),2)*Math.cos($mlat1)*Math.cos($mlat2);
    const $val2 = 2*Math.atan2(Math.sqrt($val1),Math.sqrt(1-$val1));
    return $R* $val2;
  } catch (error) {
    throw Error('no se puede calcular')
  }
  }
  deg2rad(degrees){
    const pi = Math.PI;
    return degrees * (pi/180);
  }
}

exports.CalculatorDist = CalculatorDist;