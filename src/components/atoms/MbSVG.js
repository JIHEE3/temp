import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const svg = {
  // iamport:
  //   'M0,0h27.438v106.395H0V0z M57.224,0h24.23v20.31L65.277,45.395H50.096l7.128-25.085V0z M182.575,39.834 c3.23-4.941,7.065-8.702,11.508-11.294c4.439-2.589,9.322-3.883,14.642-3.883c9.171,0,16.155,2.829,20.952,8.481 c4.797,5.653,7.198,13.872,7.198,24.657v48.6h-25.653V64.779c0.044-0.62,0.08-1.261,0.107-1.925 c0.022-0.664,0.034-1.615,0.034-2.851c0-5.652-0.831-9.752-2.494-12.293c-1.662-2.54-4.347-3.813-8.052-3.813 c-4.845,0-8.588,1.995-11.225,5.984c-2.636,3.994-4.001,9.764-4.096,17.32v39.193h-25.653V64.779c0-8.839-0.764-14.528-2.283-17.069 c-1.518-2.54-4.229-3.813-8.123-3.813c-4.893,0-8.672,2.006-11.331,6.022c-2.662,4.015-3.989,9.752-3.989,17.208v39.267H108.46 V26.582h25.656v11.685c3.134-4.513,6.733-7.909,10.796-10.189c4.06-2.282,8.54-3.421,13.433-3.421c5.509,0,10.379,1.331,14.609,3.99 C177.18,31.309,180.388,35.037,182.575,39.834 M286.189,94.85v41.903h-25.513V26.582h25.513v11.685 c3.518-4.654,7.412-8.086,11.689-10.295c4.277-2.212,9.189-3.315,14.75-3.315c9.837,0,17.905,3.909,24.232,11.722 c6.313,7.814,9.47,17.877,9.47,30.181c0,12.305-3.157,22.364-9.47,30.178c-6.327,7.816-14.395,11.722-24.232,11.722 c-5.56,0-10.472-1.103-14.75-3.312C293.601,102.939,289.707,99.507,286.189,94.85 M303.151,43.186 c-5.465,0-9.654,2.006-12.581,6.022c-2.92,4.015-4.381,9.797-4.381,17.353c0,7.552,1.461,13.337,4.381,17.353 c2.927,4.016,7.116,6.021,12.581,6.021s9.631-1.994,12.5-5.988c2.876-3.99,4.314-9.787,4.314-17.386 c0-7.603-1.439-13.4-4.314-17.389C312.782,45.182,308.616,43.186,303.151,43.186 M403.129,24.657 c13.732,0,24.455,3.706,32.176,11.118c7.722,7.411,11.578,17.673,11.578,30.785s-3.857,23.374-11.578,30.785 c-7.721,7.412-18.444,11.115-32.176,11.115c-13.776,0-24.55-3.703-32.316-11.115c-7.772-7.411-11.651-17.673-11.651-30.785 s3.878-23.374,11.651-30.785C378.58,28.363,389.354,24.657,403.129,24.657 M403.129,42.898c-5.649,0-9.971,2.032-12.935,6.095 c-2.965,4.06-4.455,9.916-4.455,17.566c0,7.647,1.49,13.503,4.455,17.566c2.964,4.06,7.286,6.091,12.935,6.091 c5.56,0,9.809-2.031,12.758-6.091c2.942-4.063,4.418-9.919,4.418-17.566c0-7.651-1.475-13.506-4.418-17.566 C412.938,44.93,408.689,42.898,403.129,42.898 M524.701,48.315c-2.233-1.043-4.453-1.818-6.659-2.316 c-2.211-0.498-4.433-0.749-6.667-0.749c-6.55,0-11.608,2.103-15.139,6.309c-3.541,4.204-5.311,10.226-5.311,18.064v36.771h-25.51 V26.582h25.51v13.112c3.282-5.225,7.042-9.038,11.29-11.438c4.255-2.4,9.352-3.599,15.295-3.599c0.856,0,1.777,0.037,2.772,0.107 c1.003,0.07,2.45,0.225,4.351,0.461L524.701,48.315z M574.008,3.92v22.662h26.289v18.241h-26.289v33.85 c0,3.705,0.736,6.213,2.205,7.519c1.474,1.309,4.396,1.961,8.769,1.961h13.112v18.241h-21.881c-10.074,0-17.205-2.102-21.41-6.305 c-4.21-4.204-6.304-11.343-6.304-21.416v-33.85h-12.685V26.582H548.5V3.92H574.008z M619.975,78.817h25.723v21.733l-17.671,26.582 h-15.178l7.126-26.582V78.817z M619.975,26.582h25.723V54.16h-25.723V26.582z',
  adIcon: [
    'm 634.25206,62.90695 -50.09187,0.603062 C 575.32427,63.616389 576,167.16344 576,176 v 1.81 C 557.1,166.81 535.42,160 512,160 441.33954,160.0772 384.07716,217.33954 384,288 v 32 c 0.0772,70.66046 57.33954,127.92284 128,128 23.42,0 45.1,-6.78 64,-17.81 V 432 c 0,8.83656 7.16344,16 16,16 h 32 c 8.83656,0 15.89617,-7.16405 16,-16 l 3.01531,-256.60306 c 0.10383,-8.83595 0.0727,-112.596367 -8.76325,-112.48999 z M 560,320 c 0,26.50969 -21.49033,47.99998 -48,47.99998 -26.50967,0 -48,-21.49029 -48,-47.99998 v -32 c 0,-26.50969 21.49033,-47.99998 48,-47.99998 26.50967,0 48,21.49029 48,47.99998 z',
    'M229.88 85.69A32 32 0 0 0 199.58 64h-47.16a32 32 0 0 0-30.3 21.69L.85 426.89A16 16 0 0 0 16 448h50.62a16 16 0 0 0 15.16-10.89L100.85 384h150.3l19.07 53.11A16 16 0 0 0 285.38 448H336a16 16 0 0 0 15.16-21.11zM129.58 304L176 174.74 222.42 304z',
  ],
  setting: [
    'm 558.44907,-2.9745093 c -0.077,0.064407 -0.15501,0.1280112 -0.23209,0.19253 10e-4,0.043213 0.009,0.086019 0.0109,0.1292264 0.0729,-0.1080261 0.14735,-0.2147294 0.22154,-0.3217564 z M 434.35075,7.021079 c -0.008,0.010806 -0.0161,0.020933 -0.0238,0.031593 0.003,0.0095 0.005,0.019315 0.008,0.029035 0.006,-0.02134 0.009,-0.039298 0.0158,-0.060628 z m 117.40471,0.6593373 c -0.0844,0.056712 -0.16577,0.1180187 -0.25055,0.1740713 0.022,0.056984 0.0468,0.1088362 0.0686,0.1661573 0.0546,-0.1082954 0.12517,-0.2300413 0.18198,-0.3402286 z M 535.03723,225.84807 a 16.690055,16.690055 0 0 0 -13.84614,8.36307 l -11.07164,19.31075 a 119.99015,119.99015 0 0 0 -42.80697,0 l -11.07164,-19.31075 a 16.690055,16.690055 0 0 0 -20.38943,-7.2923 151.00718,151.00718 0 0 0 -43.34763,25.11821 16.609035,16.609035 0 0 0 -3.77935,21.1991 l 11.07164,19.31075 a 116.57382,116.57382 0 0 0 -21.47074,36.99688 h -22.28041 a 16.784577,16.784577 0 0 0 -16.47295,14.04393 152.12795,152.12795 0 0 0 0,50.09664 16.663049,16.663049 0 0 0 16.47295,13.90944 h 22.28041 a 116.57382,116.57382 0 0 0 21.47074,36.99952 l -11.07164,19.30811 a 16.771075,16.771075 0 0 0 3.77935,21.20173 149.21125,149.21125 0 0 0 43.34763,25.11557 16.690055,16.690055 0 0 0 20.38943,-7.29229 l 11.07164,-19.30812 a 119.99015,119.99015 0 0 0 42.80697,0 l 11.07164,19.30812 a 16.690055,16.690055 0 0 0 20.38942,7.29229 151.00718,151.00718 0 0 0 43.34501,-25.11557 16.609035,16.609035 0 0 0 3.78198,-21.20173 l -11.07164,-19.30811 a 116.57382,116.57382 0 0 0 21.4681,-36.99952 h 22.28042 a 16.784577,16.784577 0 0 0 16.47559,-14.04394 152.12795,152.12795 0 0 0 0.0135,-50.09664 16.663049,16.663049 0 0 0 -16.47294,-13.90943 H 599.12007 A 116.57382,116.57382 0 0 0 577.64902,292.5469 l 11.05845,-19.31075 a 16.771075,16.771075 0 0 0 -3.78198,-21.1991 149.21125,149.21125 0 0 0 -43.34501,-25.11821 16.690055,16.690055 0 0 0 -6.54328,-1.07077 z m -46.97666,93.8188 c 11.61404,-0.16427 24.20042,3.75032 36.38502,13.11822 39.95622,51.97412 -19.31073,111.25504 -71.29836,71.28518 v 0.0135 c -30.60183,-39.80303 -3.02581,-83.88001 34.91334,-84.41659 z',
    'm 376.7662,278.71066 v 0 c 3.69416,-19.87922 3.69416,-40.26893 0,-60.14816 l 31.92115,-15.91321 c 9.56687,-5.58857 13.26101,-17.23931 9.47215,-27.56396 -8.43022,-22.9226 -24.53287,-43.95078 -39.87776,-62.32675 -7.08196,-8.4148 -19.18275,-10.53144 -28.70061,-5.02024 l -27.56396,15.91321 C 306.67232,110.53672 289.04462,100.35825 270.01506,93.624832 V 61.798408 c -0.0297,-11.070061 -8.02903,-20.5093 -18.9443,-22.354277 -23.83251,-3.995095 -48.16644,-3.963077 -71.98835,0.09472 -10.77018,1.933961 -18.60015,11.31715 -18.57489,22.259555 v 31.921146 c -19.04679,6.695998 -36.68106,16.878268 -52.00211,30.026718 L 80.941448,107.82359 c -9.516424,-5.51929 -21.622753,-3.40168 -28.700617,5.02024 -15.344885,18.37597 -31.542263,39.40415 -39.972477,62.32675 -3.8518964,10.35654 0.35637,21.97937 9.945758,27.46924 l 31.542263,16.00793 c -3.694108,19.84739 -3.694108,40.20605 0,60.05344 L 22.214112,294.6144 c -9.543727,5.57472 -13.7311214,17.17979 -9.945758,27.56396 8.430214,22.82789 24.627592,43.85606 39.972477,62.23204 7.081963,8.41479 19.182754,10.53144 28.700617,5.02024 l 27.563962,-15.8185 c 15.34485,13.11483 32.97255,23.2933 52.00211,30.02672 v 31.82643 c 0.0297,11.07006 8.02903,20.5093 18.9443,22.35428 23.79145,4.07338 48.10218,4.07338 71.89363,0 10.81669,-1.94259 18.68164,-11.36456 18.66013,-22.35428 v -31.82643 c 19.0468,-6.69599 36.68106,-16.87826 52.00211,-30.02672 v 0 l 4.8902,-19.93165 c 14.3174,-33.78829 49.86831,-74.96983 49.86831,-74.96983 3.83872,-10.38403 0,0 0,0 z M 265.36423,298.68743 C 192.42867,354.76256 109.16846,271.50236 165.2436,198.56679 c 72.93556,-56.07513 156.20524,27.18508 100.1301,100.12064 z',
  ],
};

const useStyle = makeStyles(theme => ({
  root: {
    fontSize: '16px',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    overflow: 'visible',
  },
}));

const MbSVG = ({
  style = {},
  fill = '#98a2ab',
  className = '',
  viewBox = '0 0 512 512',
  name = '',
  duotone = false,
}) => {
  const classes = useStyle();
  fill = fill === null ? '#98a2ab' : fill;
  return (
    <svg
      style={style}
      viewBox={viewBox}
      className={`svg-icon ${classes.root} ${className || ''}`}
    >
      <g>
        {typeof svg[name] === 'string' ? (
          <path fill={fill} d={svg[name]} />
        ) : (
          <>
            {svg[name].map((value, index) => {
              const style =
                duotone && (index + 1) % 2 !== 0 ? { opacity: 0.4 } : {};

              return <path key={index} fill={fill} d={value} style={style} />;
            })}
          </>
        )}
      </g>
    </svg>
  );
};

export default MbSVG;
