#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Carlos
#
# Created:     10/04/2016
# Copyright:   (c) Carlos 2016
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import arcpy

wskp = "C:\Users\Carlos\AppData\Roaming\ESRI\Desktop10.3\ArcCatalog\CARLOSHERRERA_PFM.sde"
#wskp = "C:\Users\Carlos\Dropbox\Proyecto\Madrid_mini_PRUEBAS.gdb"
arcpy.env.workspace = wskp
#Pedimos el tipo de delito y el a?o en que ocurri?
delito = arcpy.GetParameter(0)
anio = arcpy.GetParameter(1)

#Opciones para el tipo de delito
if delito == "Atracos joyerias":
    capa_delito = "{}\PFM.DBO.Atracos_joyerias".format(wskp)
elif delito == "Hurto":
    capa_delito = "{}\PFM.DBO.Hurto".format(wskp)
elif delito == "Robos":
    capa_delito = "{}\PFM.DBO.Robos".format(wskp)
elif delito == "Robos con violencia":
    capa_delito = "{}\PFM.DBO.Robos_con_violencia".format(wskp)
elif delito == "Robos con violencia en viviendas":
    capa_delito = "{}\PFM.DBO.Robos_con_violencia_en_viviendas".format(wskp)
elif delito == "Robos en establecimientos":
    capa_delito = "{}\PFM.DBO.Robos_en_establecimientos".format(wskp)
elif delito == "Robos fuerza en las cosas viviendas":
    capa_delito = "{}\PFM.DBO.Robos_fuerza_en_las_cosas_viviendas".format(wskp)
elif delito == "Sustraccion vehiculos":
    capa_delito = "{}\PFM.DBO.Sustraccion_vehiculos".format(wskp)
elif delito == "Tirones via publica":
    capa_delito = "{}\PFM.DBO.Tirones_via_publica".format(wskp)

#Opciones para el a?o
if anio == "2008":
    n_anio = "2008_mini"
elif anio == "2009":
    n_anio = "2009_mini"
elif anio == "2010":
    n_anio = "2010_mini"
elif anio == "2011":
    n_anio = "2011_mini"
elif anio == "2012":
    n_anio = "2012_mini"
elif anio == "2013":
    n_anio = "2013_mini"

#Formamos ruta de la capa con las opciones introducidas por el usuario
capa_delito_final = "{0}_{1}".format(capa_delito,n_anio)

distrito = arcpy.GetParameter(2)
if distrito == "Madrid":
    n_distrito = "Madrid"
elif distrito == "Centro":
    n_distrito = "Centro"
elif distrito == "Arganzuela":
	n_distrito = "Arganzuela"
elif distrito == "Retiro":
    n_distrito = "Retiro"
elif distrito == "Salamanca":
    n_distrito = "Salamanca"
elif distrito == "Chamartin":
    n_distrito = "Chamart?n"
elif distrito == "Tetuan":
    n_distrito = "Tetu?n"
elif distrito == "Chamberi":
    n_distrito = "Chamber?"
elif distrito == "Fuencarral - El Pardo":
    n_distrito = "Fuencarral - El Pardo"
elif distrito == "Moncloa - Aravaca":
    n_distrito = "Moncloa - Aravaca"
elif distrito == "Latina":
    n_distrito = "Latina"
elif distrito == "Carabanchel":
    n_distrito = "Carabanchel"
elif distrito == "Usera":
    n_distrito = "Usera"
elif distrito == "Puente de Vallecas":
    n_distrito = "Puente de Vallecas"
elif distrito == "Moratalaz":
    n_distrito = "Moratalaz"
elif distrito == "Ciudad Lineal":
    n_distrito = "Ciudad Lineal"
elif distrito == "Hortaleza":
    n_distrito = "Hortaleza"
elif distrito == "Villaverde":
    n_distrito = "Villaverde"
elif distrito == "Villa de Vallecas":
    n_distrito = "Villa de Vallecas"
elif distrito == "Vicalvaro":
    n_distrito = "Vic?lvaro"
elif distrito == "San Blas - Canillejas":
    n_distrito = "San Blas - Canillejas"
elif distrito == "Barajas":
    n_distrito = "Barajas"


if n_distrito == "Madrid":
    arcpy.OptimizedHotSpotAnalysis_stats(capa_delito_final,"in_memory\OpHotSpot","#","COUNT_INCIDENTS_WITHIN_FISHNET_POLYGONS","#")
    capafinal = arcpy.SetParameter(3,"in_memory\OpHotSpot")
else:
    arcpy.MakeFeatureLayer_management(capa_delito_final,"capa_delito_final_layer",""""Distrito" = '{}'""".format(n_distrito))
    arcpy.OptimizedHotSpotAnalysis_stats("capa_delito_final_layer","in_memory\OpHotSpot","#","COUNT_INCIDENTS_WITHIN_FISHNET_POLYGONS","#")
    capafinal = arcpy.SetParameter(3,"in_memory\OpHotSpot")



