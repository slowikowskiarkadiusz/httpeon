export const testOpenApi =
    {
        "openapi": "3.0.1",
        "info": {
            "title": "dummy-api",
            "version": "1.0"
        },
        "paths": {
            "/api/weatherforecast": {
                "get": {
                    "tags": [
                        "dummy-api"
                    ],
                    "operationId": "GetWeatherForecast",
                    "responses": {
                        "200": {
                            "description": "OK",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/WeatherForecast"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/weatherforecast_error": {
                "post": {
                    "tags": [
                        "dummy-api"
                    ],
                    "operationId": "GetWeatherForecast_Error",
                    "responses": {
                        "200": {
                            "description": "OK"
                        }
                    }
                }
            }
        },
        "components": {
            "schemas": {
                "DateOnly": {
                    "type": "object",
                    "properties": {
                        "year": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "month": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "day": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "dayOfWeek": {
                            "$ref": "#/components/schemas/DayOfWeek"
                        },
                        "dayOfYear": {
                            "type": "integer",
                            "format": "int32",
                            "readOnly": true
                        },
                        "dayNumber": {
                            "type": "integer",
                            "format": "int32",
                            "readOnly": true
                        }
                    },
                    "additionalProperties": false
                },
                "DayOfWeek": {
                    "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ],
                    "type": "integer",
                    "format": "int32"
                },
                "WeatherForecast": {
                    "type": "object",
                    "properties": {
                        "date": {
                            "$ref": "#/components/schemas/DateOnly"
                        },
                        "temperatureC": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "summary": {
                            "type": "string",
                            "nullable": true
                        },
                        "temperatureF": {
                            "type": "integer",
                            "format": "int32",
                            "readOnly": true
                        }
                    },
                    "additionalProperties": false
                }
            }
        }
    }