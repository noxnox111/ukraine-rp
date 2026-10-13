import{t as e}from"./shaderStore-D-XQlhUT.js";import{t}from"./sceneUboDeclaration-B5VhSG0v.js";import{a as n,i as r,n as i,o as a,r as o,t as s}from"./bumpFragment-Dy5wKBof.js";import{t as c}from"./helperFunctions-gEnZbjN3.js";import{n as l,t as u}from"./clipPlaneFragment-DVK0wgyZ.js";import{t as d}from"./pbrBRDFFunctions-BCNINF-p.js";var f=`mrtFragmentDeclaration`,p=`#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
#ifdef MESH_BLEND_TAG
#if {X}>0
#if MESH_BLEND_TAG_INDEX==0
layout(location=0) out highp uvec4 meshBlendTagOutput;
#else
layout(location=0) out highp vec4 glFragData0;
#endif
#endif
#if {X}>1
#if MESH_BLEND_TAG_INDEX==1
layout(location=1) out highp uvec4 meshBlendTagOutput;
#else
layout(location=1) out highp vec4 glFragData1;
#endif
#endif
#if {X}>2
#if MESH_BLEND_TAG_INDEX==2
layout(location=2) out highp uvec4 meshBlendTagOutput;
#else
layout(location=2) out highp vec4 glFragData2;
#endif
#endif
#if {X}>3
#if MESH_BLEND_TAG_INDEX==3
layout(location=3) out highp uvec4 meshBlendTagOutput;
#else
layout(location=3) out highp vec4 glFragData3;
#endif
#endif
#if {X}>4
#if MESH_BLEND_TAG_INDEX==4
layout(location=4) out highp uvec4 meshBlendTagOutput;
#else
layout(location=4) out highp vec4 glFragData4;
#endif
#endif
#if {X}>5
#if MESH_BLEND_TAG_INDEX==5
layout(location=5) out highp uvec4 meshBlendTagOutput;
#else
layout(location=5) out highp vec4 glFragData5;
#endif
#endif
#if {X}>6
#if MESH_BLEND_TAG_INDEX==6
layout(location=6) out highp uvec4 meshBlendTagOutput;
#else
layout(location=6) out highp vec4 glFragData6;
#endif
#endif
#if {X}>7
#if MESH_BLEND_TAG_INDEX==7
layout(location=7) out highp uvec4 meshBlendTagOutput;
#else
layout(location=7) out highp vec4 glFragData7;
#endif
#endif
void writeGeometryFragmentOutput(highp int index,highp vec4 value) {
#if {X}>0 && MESH_BLEND_TAG_INDEX != 0
if (index==0) { glFragData0=value; }
#endif
#if {X}>1 && MESH_BLEND_TAG_INDEX != 1
if (index==1) { glFragData1=value; }
#endif
#if {X}>2 && MESH_BLEND_TAG_INDEX != 2
if (index==2) { glFragData2=value; }
#endif
#if {X}>3 && MESH_BLEND_TAG_INDEX != 3
if (index==3) { glFragData3=value; }
#endif
#if {X}>4 && MESH_BLEND_TAG_INDEX != 4
if (index==4) { glFragData4=value; }
#endif
#if {X}>5 && MESH_BLEND_TAG_INDEX != 5
if (index==5) { glFragData5=value; }
#endif
#if {X}>6 && MESH_BLEND_TAG_INDEX != 6
if (index==6) { glFragData6=value; }
#endif
#if {X}>7 && MESH_BLEND_TAG_INDEX != 7
if (index==7) { glFragData7=value; }
#endif
}
#define WRITE_GEOMETRY_FRAGMENT_OUTPUT(INDEX,VALUE) writeGeometryFragmentOutput(INDEX,VALUE)
#else
layout(location=0) out vec4 glFragData[{X}];
#define WRITE_GEOMETRY_FRAGMENT_OUTPUT(INDEX,VALUE) gl_FragData[INDEX]=VALUE
#endif
#else
#define WRITE_GEOMETRY_FRAGMENT_OUTPUT(INDEX,VALUE) gl_FragData[INDEX]=VALUE
#endif
`;e.IncludesShadersStore[f]||(e.IncludesShadersStore[f]=p);var m={name:f,shader:p},h=`pbrFragmentReflectionDeclaration`,g=`#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
#define sampleReflection(s,c) textureCube(s,c)
uniform samplerCube reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) textureCubeLodEXT(s,c,l)
#else
uniform samplerCube reflectionSamplerLow;uniform samplerCube reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform samplerCube irradianceSampler;
#endif
#else
#define sampleReflection(s,c) texture2D(s,c)
uniform sampler2D reflectionSampler;
#ifdef LODBASEDMICROSFURACE
#define sampleReflectionLod(s,c,l) texture2DLodEXT(s,c,l)
#else
uniform sampler2D reflectionSamplerLow;uniform sampler2D reflectionSamplerHigh;
#endif
#ifdef USEIRRADIANCEMAP
uniform sampler2D irradianceSampler;
#endif
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vec3 vPositionUVW;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vec3 vDirectionW;
#endif
#endif
#endif
`;e.IncludesShadersStore[h]||(e.IncludesShadersStore[h]=g);var _={name:h,shader:g},v=`sceneFragmentDeclaration`,y=`uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
uniform mat4 view;uniform mat4 projection;uniform vec4 vEyePosition;uniform mat4 inverseProjection;
`;e.IncludesShadersStore[v]||(e.IncludesShadersStore[v]=y);var b={name:v,shader:y},x=`openpbrDielectricReflectance`,S=`struct ReflectanceParams
{float F0;float F90;vec3 coloredF0;vec3 coloredF90;};
#define pbr_inline
ReflectanceParams dielectricReflectance(
in float insideIOR,in float outsideIOR,in vec3 specularColor,in float specularWeight
)
{ReflectanceParams outParams;float dielectricF0=pow((insideIOR-outsideIOR)/(insideIOR+outsideIOR),2.0);float f90Scale=clamp(2.0*abs(insideIOR-outsideIOR),0.0,1.0);
#if (DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_OPENPBR)
vec3 dielectricColorF90=specularColor.rgb*vec3(f90Scale);
#else
vec3 dielectricColorF90=vec3(f90Scale);
#endif
#if DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_GLTF
float maxF0=max(specularColor.r,max(specularColor.g,specularColor.b));outParams.F0=dielectricF0*specularWeight*maxF0;
#else
outParams.F0=dielectricF0*specularWeight;
#endif
outParams.F90=f90Scale*specularWeight;outParams.coloredF0=vec3(dielectricF0*specularWeight)*specularColor.rgb;outParams.coloredF90=dielectricColorF90*vec3(specularWeight);return outParams;}
`;e.IncludesShadersStore[x]||(e.IncludesShadersStore[x]=S);var C={name:x,shader:S},w=`pbrIBLFunctions`,T=`#if defined(REFLECTION) || defined(SS_REFRACTION)
float getLodFromAlphaG(float cubeMapDimensionPixels,float microsurfaceAverageSlope) {float microsurfaceAverageSlopeTexels=cubeMapDimensionPixels*microsurfaceAverageSlope;float lod=log2(microsurfaceAverageSlopeTexels);return lod;}
float getLinearLodFromRoughness(float cubeMapDimensionPixels,float roughness) {float lod=log2(cubeMapDimensionPixels)*roughness;return lod;}
#endif
#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)
float environmentRadianceOcclusion(float ambientOcclusion,float NdotVUnclamped) {float temp=NdotVUnclamped+ambientOcclusion;return saturate(square(temp)-1.0+ambientOcclusion);}
#endif
#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)
float environmentHorizonOcclusion(vec3 view,vec3 normal,vec3 geometricNormal) {vec3 reflection=reflect(view,normal);float temp=saturate(1.0+1.1*dot(reflection,geometricNormal));return square(temp);}
#endif
#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)
#define UNPACK_LOD(x) (1.0-x)*255.0
float getLodFromAlphaG(float cubeMapDimensionPixels,float alphaG,float NdotV) {float microsurfaceAverageSlope=alphaG;microsurfaceAverageSlope*=sqrt(abs(NdotV));return getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);}
#endif
`;e.IncludesShadersStore[w]||(e.IncludesShadersStore[w]=T);var E={name:w,shader:T},D=`openpbrGeometryInfo`,O=`struct geometryInfoOutParams
{float NdotV;float NdotVUnclamped;vec3 environmentBrdf;float horizonOcclusion;};struct geometryInfoAnisoOutParams
{float NdotV;float NdotVUnclamped;vec3 environmentBrdf;float horizonOcclusion;float anisotropy;vec3 anisotropicTangent;vec3 anisotropicBitangent;mat3 TBN;};
#define pbr_inline
geometryInfoOutParams geometryInfo(
in vec3 normalW,in vec3 viewDirectionW,in float roughness,in vec3 geometricNormalW
)
{geometryInfoOutParams outParams;outParams.NdotVUnclamped=dot(normalW,viewDirectionW);outParams.NdotV=absEps(outParams.NdotVUnclamped);
#if defined(ENVIRONMENTBRDF)
outParams.environmentBrdf=getBRDFLookup(outParams.NdotV,roughness);
#else
outParams.environmentBrdf=vec3(0.0);
#endif
outParams.horizonOcclusion=1.0;
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef HORIZONOCCLUSION
#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL)
#ifdef REFLECTIONMAP_3D
outParams.horizonOcclusion=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif
return outParams;}
#define pbr_inline
geometryInfoAnisoOutParams geometryInfoAniso(
in vec3 normalW,in vec3 viewDirectionW,in float roughness,in vec3 geometricNormalW
,in vec3 vAnisotropy,in mat3 TBN
)
{geometryInfoOutParams geoInfo=geometryInfo(normalW,viewDirectionW,roughness,geometricNormalW);geometryInfoAnisoOutParams outParams;outParams.NdotV=geoInfo.NdotV;outParams.NdotVUnclamped=geoInfo.NdotVUnclamped;outParams.environmentBrdf=geoInfo.environmentBrdf;outParams.horizonOcclusion=geoInfo.horizonOcclusion;outParams.anisotropy=vAnisotropy.b;vec3 anisotropyDirection=vec3(vAnisotropy.xy,0.);mat3 anisoTBN=mat3(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));outParams.anisotropicTangent=normalize(anisoTBN*anisotropyDirection);outParams.anisotropicBitangent=normalize(cross(anisoTBN[2],outParams.anisotropicTangent));outParams.TBN=TBN;return outParams;}`;e.IncludesShadersStore[D]||(e.IncludesShadersStore[D]=O);var k={name:D,shader:O},A=`openpbrIblFunctions`,j=`#ifdef REFLECTION
vec3 sampleIrradiance(
in vec3 surfaceNormal
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,in vec3 vEnvironmentIrradianceSH
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,in mat4 iblMatrix
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
,in samplerCube irradianceSampler
#else
,in sampler2D irradianceSampler
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,in vec3 reflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,in sampler2D icdfSampler
#endif
#endif
,in vec2 vReflectionInfos
,in vec3 viewDirectionW
,in float diffuseRoughness
,in vec3 surfaceAlbedo
) {vec3 environmentIrradiance=vec3(0.,0.,0.);
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
vec3 irradianceVector=(iblMatrix*vec4(surfaceNormal,0)).xyz;vec3 irradianceView=(iblMatrix*vec4(viewDirectionW,0)).xyz;
#if !defined(USE_IRRADIANCE_DOMINANT_DIRECTION) && !defined(REALTIME_FILTERING)
#if BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LAMBERT && BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LEGACY
{float NdotV=max(dot(surfaceNormal,viewDirectionW),0.0);irradianceVector=mix(irradianceVector,irradianceView,(0.5*(1.0-NdotV))*diffuseRoughness);}
#endif
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;irradianceView.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;irradianceView.y*=-1.0;
#endif
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradianceSH;
#else
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,irradianceVector,vReflectionFilteringInfo,diffuseRoughness,surfaceAlbedo,irradianceView
#ifdef IBL_CDF_FILTERING
,icdfSampler
#endif
);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
vec4 environmentIrradianceFromTexture=sampleReflection(irradianceSampler,irradianceVector);
#else
vec4 environmentIrradianceFromTexture=sampleReflection(irradianceSampler,reflectionCoords);
#endif
environmentIrradiance=environmentIrradianceFromTexture.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradianceFromTexture);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpace(environmentIrradiance.rgb);
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
vec3 Ls=normalize(reflectionDominantDirection);float NoL=dot(irradianceVector,Ls);float NoV=dot(irradianceVector,irradianceView);vec3 diffuseRoughnessTerm=vec3(1.0);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
float LoV=dot (Ls,irradianceView);float mag=length(reflectionDominantDirection)*2.0;vec3 clampedAlbedo=clamp(surfaceAlbedo,vec3(0.1),vec3(1.0));diffuseRoughnessTerm=diffuseBRDF_EON(clampedAlbedo,diffuseRoughness,NoL,NoV,LoV)*PI;diffuseRoughnessTerm=diffuseRoughnessTerm/clampedAlbedo;diffuseRoughnessTerm=mix(vec3(1.0),diffuseRoughnessTerm,sqrt(clamp(mag*NoV,0.0,1.0)));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
vec3 H=(irradianceView+Ls)*0.5;float VoH=dot(irradianceView,H);diffuseRoughnessTerm=vec3(diffuseBRDF_Burley(NoL,NoV,VoH,diffuseRoughness)*PI);
#endif
environmentIrradiance=environmentIrradiance.rgb*diffuseRoughnessTerm;
#endif
#endif
environmentIrradiance*=vReflectionInfos.x;return environmentIrradiance;}
#define pbr_inline
#ifdef REFLECTIONMAP_3D
vec3 createReflectionCoords(
#else
vec2 createReflectionCoords(
#endif
in vec3 vPositionW
,in vec3 normalW
)
{vec3 reflectionVector=computeReflectionCoords(vec4(vPositionW,1.0),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords=reflectionVector;
#else
vec2 reflectionCoords=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0-reflectionCoords.y;
#endif
return reflectionCoords;}
#define pbr_inline
#define inline
vec3 sampleRadiance(
in float alphaG
,in vec3 vReflectionMicrosurfaceInfos
,in vec2 vReflectionInfos
,in geometryInfoOutParams geoInfo
#ifdef REFLECTIONMAP_3D
,in samplerCube reflectionSampler
,const vec3 reflectionCoords
#else
,in sampler2D reflectionSampler
,const vec2 reflectionCoords
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#endif
)
{vec4 environmentRadiance=vec4(0.,0.,0.,0.);
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
environmentRadiance=vec4(radiance(alphaG,reflectionSampler,reflectionCoords,vReflectionFilteringInfo),1.0);
#else
environmentRadiance=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#endif
#ifdef RGBDREFLECTION
environmentRadiance.rgb=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
environmentRadiance.rgb=toLinearSpace(environmentRadiance.rgb);
#endif
environmentRadiance.rgb*=vec3(vReflectionInfos.x);return environmentRadiance.rgb;}
#if defined(ANISOTROPIC)
#define pbr_inline
#define inline
vec3 sampleRadianceAnisotropic(
in float alphaG
,in vec3 vReflectionMicrosurfaceInfos
,in vec2 vReflectionInfos
,in geometryInfoAnisoOutParams geoInfo
,const vec3 normalW
,const vec3 viewDirectionW
,const vec3 positionW
,const vec3 noise
,bool isRefraction
,float ior
#ifdef REFLECTIONMAP_3D
,in samplerCube reflectionSampler
#else
,in sampler2D reflectionSampler
#endif
#ifdef REALTIME_FILTERING
,in vec2 vReflectionFilteringInfo
#endif
)
{vec4 environmentRadiance=vec4(0.,0.,0.,0.);float alphaT=alphaG*sqrt(2.0/(1.0+(1.0-geoInfo.anisotropy)*(1.0-geoInfo.anisotropy)));float alphaB=(1.0-geoInfo.anisotropy)*alphaT;alphaG=alphaB;
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
float reflectionLOD=getLinearLodFromRoughness(vReflectionMicrosurfaceInfos.x,roughness);
#else
float reflectionLOD=getLodFromAlphaG(vReflectionMicrosurfaceInfos.x,alphaG);
#endif
reflectionLOD=reflectionLOD*vReflectionMicrosurfaceInfos.y+vReflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
vec3 view=(reflectionMatrix*vec4(viewDirectionW,0.0)).xyz;vec3 tangent=(reflectionMatrix*vec4(geoInfo.anisotropicTangent,0.0)).xyz;vec3 bitangent=(reflectionMatrix*vec4(geoInfo.anisotropicBitangent,0.0)).xyz;vec3 normal=(reflectionMatrix*vec4(normalW,0.0)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
view.z*=-1.0;tangent.z*=-1.0;bitangent.z*=-1.0;normal.z*=-1.0;
#endif
environmentRadiance=vec4(radianceAnisotropic(alphaT,alphaB,reflectionSampler,view,tangent,bitangent,normal,vReflectionFilteringInfo,noise.xy,isRefraction,ior),1.0);
#else
const int samples=16;vec4 radianceSample=vec4(0.0);float sample_weight=0.0;float total_weight=0.0;float step=1.0/float(max(samples-1,1));for (int i=0; i<samples; ++i) {float t=mix(-1.0,1.0,float(i)*step);t+=step*2.0*noise.x;sample_weight=max(1.0-abs(t),0.001);sample_weight*=sample_weight;t*=min(4.0*alphaT*geoInfo.anisotropy,1.0);vec3 bentNormal;if (t<0.0) {float blend=t+1.0;bentNormal=normalize(mix(-geoInfo.anisotropicTangent,normalW,blend));} else if (t>0.0) {float blend=t;bentNormal=normalize(mix(normalW,geoInfo.anisotropicTangent,blend));} else {bentNormal=normalW;}
#ifdef REFLECTIONMAP_3D
vec3 reflectionCoords;if (isRefraction) {reflectionCoords=double_refract(-viewDirectionW,bentNormal,ior);} else {reflectionCoords=reflect(-viewDirectionW,bentNormal);}
reflectionCoords=vec3(reflectionMatrix*vec4(reflectionCoords,0));
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionCoords.z*=-1.0;
#endif
#else
vec3 sampleDirection;if (isRefraction) {sampleDirection=double_refract(-viewDirectionW,bentNormal,ior);} else {sampleDirection=reflect(-viewDirectionW,bentNormal);}
vec3 originalViewDirectionW=normalize(vEyePosition.xyz-positionW);vec3 mappingNormalCandidate=originalViewDirectionW+sampleDirection;vec3 mappingNormal;if (dot(mappingNormalCandidate,mappingNormalCandidate)>Epsilon) {mappingNormal=normalize(mappingNormalCandidate);} else {vec3 perpendicularAxis=abs(originalViewDirectionW.x)<0.9 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0);mappingNormal=normalize(cross(originalViewDirectionW,perpendicularAxis));}
vec2 reflectionCoords=createReflectionCoords(positionW,mappingNormal);
#endif
radianceSample=sampleReflectionLod(reflectionSampler,reflectionCoords,reflectionLOD);
#ifdef RGBDREFLECTION
environmentRadiance.rgb+=sample_weight*fromRGBD(radianceSample);
#elif defined(GAMMAREFLECTION)
environmentRadiance.rgb+=sample_weight*toLinearSpace(radianceSample.rgb);
#else
environmentRadiance.rgb+=sample_weight*radianceSample.rgb;
#endif
total_weight+=sample_weight;}
environmentRadiance=vec4(environmentRadiance.xyz/float(total_weight),1.0);
#endif
environmentRadiance.rgb*=vec3(vReflectionInfos.x);return environmentRadiance.rgb;}
#endif
#endif
#if defined(ENVIRONMENTBRDF)
#define pbr_inline
float computeDielectricIblFresnel(in ReflectanceParams reflectance,in vec3 environmentBrdf)
{float dielectricIblFresnel=getReflectanceFromBRDFLookup(vec3(reflectance.F0),vec3(reflectance.F90),environmentBrdf).r;float dielectricECF=1.0+reflectance.F0*(1.0/environmentBrdf.y-1.0);return clamp(dielectricIblFresnel*dielectricECF,0.0,1.0);}
#define pbr_inline
vec3 computeConductorIblFresnel(in ReflectanceParams reflectance,in vec3 environmentBrdf)
{
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR) && defined(ENVIRONMENTBRDF)
vec3 openPBRBrdf=vec3(environmentBrdf.xy,environmentBrdf.z/BRDF_Z_SCALE);vec3 b =getF82B(reflectance.coloredF0,reflectance.coloredF90);vec3 E_F82=getF82DirectionalAlbedo(reflectance.coloredF0,vec3(1.0),b,openPBRBrdf);vec3 F_avg=getF82AverageFresnel(reflectance.coloredF0,b);vec3 ECF =vec3(1.0)+F_avg*(vec3(1.0)/openPBRBrdf.y-vec3(1.0));return clamp(E_F82*ECF,vec3(0.0),vec3(1.0));
#else
return getReflectanceFromBRDFLookup(reflectance.coloredF0,reflectance.coloredF90,environmentBrdf);
#endif
}
#endif
`;e.IncludesShadersStore[A]||(e.IncludesShadersStore[A]=j);var M={name:A,shader:j},N=`openpbrSubsurfaceLayerData`,P=`float subsurface_weight=vSubsurfaceWeight;vec3 subsurface_color=vSubsurfaceColor.rgb;float subsurface_radius=vSubsurfaceRadius;vec3 subsurface_radius_scale=vSubsurfaceRadiusScale;float subsurface_scatter_anisotropy=clamp(vSubsurfaceScatterAnisotropy,-0.9999,0.9999);
#ifdef SUBSURFACE_WEIGHT
vec4 subsurfaceWeightFromTexture=TEXRD(subsurfaceWeightSampler,vSubsurfaceWeightUV+uvOffset);
#endif
#ifdef SUBSURFACE_COLOR
vec4 subsurfaceColorFromTexture=TEXRD(subsurfaceColorSampler,vSubsurfaceColorUV+uvOffset);
#endif
#ifdef SUBSURFACE_RADIUS_SCALE
vec4 subsurfaceRadiusScaleFromTexture=TEXRD(subsurfaceRadiusScaleSampler,vSubsurfaceRadiusScaleUV+uvOffset);
#endif
#ifdef SUBSURFACE_WEIGHT
#ifdef SUBSURFACE_WEIGHT_FROM_TEXTURE_ALPHA
subsurface_weight*=subsurfaceWeightFromTexture.a;
#else
subsurface_weight*=subsurfaceWeightFromTexture.r;
#endif
#endif
#ifdef SUBSURFACE_COLOR
#ifdef SUBSURFACE_COLOR_GAMMA
subsurface_color*=toLinearSpace(subsurfaceColorFromTexture.rgb);
#else
subsurface_color*=subsurfaceColorFromTexture.rgb;
#endif
subsurface_color*=vSubsurfaceColorInfos.y;
#endif
#ifdef SUBSURFACE_RADIUS_SCALE
subsurface_radius_scale*=subsurfaceRadiusScaleFromTexture.rgb;
#endif
`;e.IncludesShadersStore[N]||(e.IncludesShadersStore[N]=P);var F={name:N,shader:P},I=`openpbrTransmissionLayerData`,L=`float transmission_weight=vTransmissionWeight;vec3 transmission_color=vTransmissionColor.rgb;float transmission_depth=vTransmissionDepth;vec3 transmission_scatter=vTransmissionScatter.rgb;float transmission_scatter_anisotropy=clamp(vTransmissionScatterAnisotropy,-0.9999,0.9999);float transmission_dispersion_scale=vTransmissionDispersionScale;float transmission_dispersion_abbe_number=vTransmissionDispersionAbbeNumber;
#ifdef TRANSMISSION_WEIGHT
vec4 transmissionWeightFromTexture=TEXRD(transmissionWeightSampler,vTransmissionWeightUV+uvOffset);
#endif
#ifdef TRANSMISSION_COLOR
vec4 transmissionColorFromTexture=TEXRD(transmissionColorSampler,vTransmissionColorUV+uvOffset);
#endif
#ifdef TRANSMISSION_DEPTH
vec4 transmissionDepthFromTexture=TEXRD(transmissionDepthSampler,vTransmissionDepthUV+uvOffset);
#endif
#ifdef TRANSMISSION_SCATTER
vec4 transmissionScatterFromTexture=TEXRD(transmissionScatterSampler,vTransmissionScatterUV+uvOffset);
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
vec4 transmissionDispersionScaleFromTexture=TEXRD(transmissionDispersionScaleSampler,vTransmissionDispersionScaleUV+uvOffset);
#endif
#ifdef TRANSMISSION_WEIGHT
transmission_weight*=transmissionWeightFromTexture.r;
#endif
#ifdef TRANSMISSION_COLOR
#ifdef TRANSMISSION_COLOR_GAMMA
transmission_color*=toLinearSpace(transmissionColorFromTexture.rgb);
#else
transmission_color*=transmissionColorFromTexture.rgb;
#endif
transmission_color*=vTransmissionColorInfos.y;
#endif
#ifdef TRANSMISSION_DEPTH
transmission_depth*=transmissionDepthFromTexture.r;
#endif
#ifdef TRANSMISSION_SCATTER
transmission_scatter*=transmissionScatterFromTexture.rgb;
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
transmission_dispersion_scale*=transmissionDispersionScaleFromTexture.r;
#endif
`;e.IncludesShadersStore[I]||(e.IncludesShadersStore[I]=L);var R={name:I,shader:L},z=`geometryPixelShader`,B=`#extension GL_EXT_draw_buffers : require
#if defined(BUMP) || !defined(NORMAL)
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
#ifdef BUMP
varying mat4 vWorldView;varying vec3 vNormalW;
#else
varying vec3 vNormalV;
#endif
varying vec4 vViewPos;
#if defined(POSITION) || defined(BUMP) || defined(IRRADIANCE)
varying vec3 vPositionW;
#endif
#if defined(VELOCITY) || defined(VELOCITY_LINEAR)
varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#ifdef NEED_UV
varying vec2 vUV;
#endif
#ifdef BUMP
uniform vec3 vBumpInfos;uniform vec2 vTangentSpaceParams;
#endif
#if defined(REFLECTIVITY)
#if defined(ORMTEXTURE) || defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
uniform sampler2D reflectivitySampler;varying vec2 vReflectivityUV;
#else
#ifdef METALLIC_TEXTURE
uniform sampler2D metallicSampler;varying vec2 vMetallicUV;
#endif
#ifdef ROUGHNESS_TEXTURE
uniform sampler2D roughnessSampler;varying vec2 vRoughnessUV;
#endif
#endif
#ifdef ALBEDOTEXTURE
varying vec2 vAlbedoUV;uniform sampler2D albedoSampler;
#endif
#ifdef REFLECTIVITYCOLOR
uniform vec3 reflectivityColor;
#endif
#ifdef ALBEDOCOLOR
uniform vec3 albedoColor;
#endif
#ifdef METALLIC
uniform float metallic;
#endif
#if defined(ROUGHNESS) || defined(GLOSSINESS)
uniform float glossiness;
#endif
#endif
#if defined(ALPHATEST) && defined(NEED_UV)
uniform sampler2D diffuseSampler;uniform float alphaCutOff;
#endif
#ifdef OBJECT_ID
uniform float objectId;
#include<objectIdFunctions>
#endif
#ifdef MESH_BLEND_TAG
uniform int meshBlendTag;
#endif
#include<clipPlaneFragmentDeclaration>
#include<mrtFragmentDeclaration>[SCENE_MRT_COUNT]
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#include<helperFunctions>
#ifdef IRRADIANCE
#include<pbrFragmentReflectionDeclaration>
#ifdef REFLECTION
#ifdef USEIRRADIANCEMAP
#include<__decl__sceneFragment>
uniform mat4 reflectionMatrix;uniform vec2 vReflectionInfos;uniform vec3 vReflectionDominantDirection;
#include<pbrBRDFFunctions>
#include<openpbrDielectricReflectance>
#include<pbrIBLFunctions>
#include<reflectionFunction>
#include<openpbrGeometryInfo>
#include<openpbrIblFunctions>
#elif defined(USESPHERICALFROMREFLECTIONMAP)
varying vec3 vEnvironmentIrradiance;
#endif
#ifdef IBL_SHADOW_TEXTURE
uniform sampler2D iblShadowSampler;uniform vec2 shadowTextureSize;
#endif
#ifdef IRRADIANCE_SCATTER_MASK
uniform float vSubsurfaceWeight;
#include<samplerFragmentDeclaration>(_DEFINENAME_,SUBSURFACE_WEIGHT,_VARYINGNAME_,SubsurfaceWeight,_SAMPLERNAME_,subsurfaceWeight)
uniform float vSubsurfaceScatterAnisotropy;uniform float vTransmissionWeight;
#include<samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_WEIGHT,_VARYINGNAME_,TransmissionWeight,_SAMPLERNAME_,transmissionWeight)
uniform float vTransmissionScatterAnisotropy;
#endif
#endif
#endif
void main() {
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (texture2D(diffuseSampler,vUV).a<alphaCutOff)
discard;
#endif
vec3 normalOutput;
#ifdef BUMP
vec3 normalW=normalize(vNormalW);
#include<bumpFragment>
#ifdef NORMAL_WORLDSPACE
normalOutput=normalW;
#else
normalOutput=normalize(vec3(vWorldView*vec4(normalW,0.0)));
#endif
#elif defined(HAS_NORMAL_ATTRIBUTE)
normalOutput=normalize(vNormalV);
#elif defined(POSITION)
normalOutput=normalize(-cross(dFdx(vPositionW),dFdy(vPositionW)));
#endif
#ifdef ENCODE_NORMAL
normalOutput=normalOutput*0.5+0.5;
#endif
#ifdef DEPTH
WRITE_GEOMETRY_FRAGMENT_OUTPUT(DEPTH_INDEX,vec4(vViewPos.z/vViewPos.w,0.0,0.0,1.0));
#endif
#ifdef NORMAL
WRITE_GEOMETRY_FRAGMENT_OUTPUT(NORMAL_INDEX,vec4(normalOutput,1.0));
#endif
#ifdef SCREENSPACE_DEPTH
WRITE_GEOMETRY_FRAGMENT_OUTPUT(SCREENSPACE_DEPTH_INDEX,vec4(gl_FragCoord.z,0.0,0.0,1.0));
#endif
#ifdef POSITION
WRITE_GEOMETRY_FRAGMENT_OUTPUT(POSITION_INDEX,vec4(vPositionW,1.0));
#endif
#ifdef OBJECT_ID
WRITE_GEOMETRY_FRAGMENT_OUTPUT(OBJECT_ID_INDEX,encodeObjectId(objectId));
#endif
#ifdef MESH_BLEND_TAG
meshBlendTagOutput=uvec4(uint(meshBlendTag),0u,0u,0u);
#endif
#ifdef VELOCITY
vec2 a=(vCurrentPosition.xy/vCurrentPosition.w)*0.5+0.5;vec2 b=(vPreviousPosition.xy/vPreviousPosition.w)*0.5+0.5;vec2 velocity=abs(a-b);velocity=vec2(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;WRITE_GEOMETRY_FRAGMENT_OUTPUT(VELOCITY_INDEX,vec4(velocity,0.0,1.0));
#endif
#ifdef VELOCITY_LINEAR
vec2 velocity=vec2(0.5)*((vPreviousPosition.xy/vPreviousPosition.w) -
(vCurrentPosition.xy/vCurrentPosition.w));WRITE_GEOMETRY_FRAGMENT_OUTPUT(VELOCITY_LINEAR_INDEX,vec4(velocity,0.0,1.0));
#endif
#ifdef REFLECTIVITY
vec4 reflectivity=vec4(0.0,0.0,0.0,1.0);
#ifdef METALLICWORKFLOW
float metal=1.0;float roughness=1.0;
#ifdef ORMTEXTURE
metal*=texture2D(reflectivitySampler,vReflectivityUV).b;roughness*=texture2D(reflectivitySampler,vReflectivityUV).g;
#else
#ifdef METALLIC_TEXTURE
metal*=texture2D(metallicSampler,vMetallicUV).r;
#endif
#ifdef ROUGHNESS_TEXTURE
roughness*=texture2D(roughnessSampler,vRoughnessUV).r;
#endif
#endif
#ifdef METALLIC
metal*=metallic;
#endif
#ifdef ROUGHNESS
roughness*=(1.0-glossiness); 
#endif
reflectivity.a-=roughness;vec3 color=vec3(1.0);
#ifdef ALBEDOTEXTURE
color=texture2D(albedoSampler,vAlbedoUV).rgb;
#ifdef GAMMAALBEDO
color=toLinearSpace(color);
#endif
#endif
#ifdef ALBEDOCOLOR
color*=albedoColor.xyz;
#endif
reflectivity.rgb=mix(vec3(0.04),color,metal);
#else
#if defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
reflectivity=texture2D(reflectivitySampler,vReflectivityUV);
#ifdef GAMMAREFLECTIVITYTEXTURE
reflectivity.rgb=toLinearSpace(reflectivity.rgb);
#endif
#else 
#ifdef REFLECTIVITYCOLOR
reflectivity.rgb=toLinearSpace(reflectivityColor.xyz);reflectivity.a=1.0;
#endif
#endif
#ifdef GLOSSINESSS
reflectivity.a*=glossiness; 
#endif
#endif
WRITE_GEOMETRY_FRAGMENT_OUTPUT(REFLECTIVITY_INDEX,reflectivity);
#endif
#ifdef IRRADIANCE
vec3 irradiance=vec3(0.0);float irradiance_alpha=1.0;
#ifdef REFLECTION
#ifdef IRRADIANCE_SCATTER_MASK
#ifndef BUMP
vec2 uvOffset=vec2(0.0);
#endif
vec3 vSubsurfaceColor=vec3(1.0);float vSubsurfaceRadius=0.0;vec3 vSubsurfaceRadiusScale=vec3(1.0);
#include<openpbrSubsurfaceLayerData>
float vTransmissionDepth=1.0;vec3 vTransmissionColor=vec3(1.0);vec3 vTransmissionScatter=vec3(0.0);float vTransmissionDispersionScale=0.0;float vTransmissionDispersionAbbeNumber=0.0;
#include<openpbrTransmissionLayerData>
#endif
#ifdef IBL_SHADOW_TEXTURE
#ifdef COLORED_IBL_SHADOWS
vec3 iblShadowValue=texture(iblShadowSampler,gl_FragCoord.xy/shadowTextureSize).rgb;
#else
vec3 iblShadowValue=vec3(texture(iblShadowSampler,gl_FragCoord.xy/shadowTextureSize).r);
#endif
#endif
#if defined(USEIRRADIANCEMAP)
#ifdef IRRADIANCE_SCATTER_MASK
float bendAmount=subsurface_weight*-min(subsurface_scatter_anisotropy,0.0);bendAmount=mix(bendAmount,-min(transmission_scatter_anisotropy,0.0),transmission_weight);vec3 viewVector=normalize(vEyePosition.xyz-vPositionW.xyz);vec3 bentNormal=mix(normalOutput,viewVector,bendAmount*dot(normalOutput,viewVector));
#else
vec3 bentNormal=normalOutput;
#endif
irradiance=sampleIrradiance(
bentNormal
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,vEnvironmentIrradiance
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,reflectionMatrix
#endif
#ifdef USEIRRADIANCEMAP
,irradianceSampler
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,vReflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,icdfSampler
#endif
#endif
,vReflectionInfos
,vViewPos.xyz
,1.0
,vec3(1.0)
);
#elif defined(USESPHERICALFROMREFLECTIONMAP)
irradiance=vEnvironmentIrradiance;
#endif
#ifdef IBL_SHADOW_TEXTURE
irradiance*=iblShadowValue;
#endif
#ifdef IRRADIANCE_SCATTER_MASK
irradiance_alpha=min(subsurface_weight+transmission_weight,1.0);
#endif
#endif
WRITE_GEOMETRY_FRAGMENT_OUTPUT(IRRADIANCE_INDEX,vec4(irradiance,irradiance_alpha));
#endif
}
`;e.ShadersStore[z]||(e.ShadersStore[z]=B);var V=[a,l,m,o,n,i,c,_,b,t,d,C,E,r,k,M,u,s,F,R];for(let t of V)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var H={name:z,shader:B};export{H as geometryPixelShader};