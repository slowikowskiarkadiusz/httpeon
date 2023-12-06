export const dimOpenApi = {
    "openapi": "3.0.1",
    "info": {
        "title": "Bws.Dim.App",
        "version": "1.0"
    },
    "paths": {
        "/api/Autocomplete/{environment}/Test": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/Categories/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/MessageTypes/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/ServiceNames/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/ResourceNames/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/Systems/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Autocomplete/{environment}/Tags/{dateFrom}/{dateTo}": {
            "get": {
                "tags": [
                    "Autocomplete"
                ],
                "parameters": [
                    {
                        "name": "query",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "dateFrom",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "dateTo",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Integration/{services}/Steps/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Integration"
                ],
                "parameters": [
                    {
                        "name": "services",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "onlyFailed",
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 0
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 30
                        }
                    },
                    {
                        "name": "sortBy",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "sortingOrderAsc",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepTableRowQueriedResponse"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepTableRowQueriedResponse"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepTableRowQueriedResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Integration/{services}/Messages/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Integration"
                ],
                "parameters": [
                    {
                        "name": "services",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "onlyFailed",
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 0
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 30
                        }
                    },
                    {
                        "name": "sortBy",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "sortingOrderAsc",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Integration/AllServices/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Integration"
                ],
                "parameters": [
                    {
                        "name": "onlyFailingServices",
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Integration/{services}/Extensions/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Integration"
                ],
                "parameters": [
                    {
                        "name": "services",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "onlyFailingServices",
                        "in": "query",
                        "schema": {
                            "type": "boolean"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/IntegrationHistoryExtensions"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/IntegrationHistoryExtensions"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/IntegrationHistoryExtensions"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/Test/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/MessageType/Count/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/MessageType/{type}/TopPostingServices/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "type",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/{service}/StepData/Count/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "service",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/{service}/StepData/CountByName/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "service",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/{service}/MessageType/Count/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "service",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/LineChart/StepData/Count/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "LineChart"
                ],
                "parameters": [
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "points",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 10
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 6
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "onlyFailing",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/LineChartData"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Message": {
            "get": {
                "tags": [
                    "Message"
                ],
                "parameters": [
                    {
                        "name": "guid",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "id",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageDto"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageDto"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageDto"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/MessageTypes/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Message"
                ],
                "parameters": [
                    {
                        "name": "filter",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Messages/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Messages"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "content",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "type",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "category",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "originSystem",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "destinationSystem",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "sentFrom",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "tags",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 0
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 30
                        }
                    },
                    {
                        "name": "sortBy",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "sortingOrderAsc",
                        "in": "query",
                        "schema": {
                            "type": "boolean",
                            "default": false
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/MessageTableRowQueriedResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Services/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Service"
                ],
                "parameters": [
                    {
                        "name": "filter",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Services": {
            "get": {
                "tags": [
                    "Service"
                ],
                "parameters": [
                    {
                        "name": "filter",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ServiceWithResourceName"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/Step/{id}": {
            "get": {
                "tags": [
                    "Step"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": -1
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepDataDto"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepDataDto"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepDataDto"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Steps/SinglePath/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Steps"
                ],
                "parameters": [
                    {
                        "name": "messageId",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "decisions",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/{environment}/Steps/FullTree/{fromDate}/{toDate}": {
            "get": {
                "tags": [
                    "Steps"
                ],
                "parameters": [
                    {
                        "name": "messageId",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "decisions",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "fromDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "toDate",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "environment",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "default": "dev"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StepPathNode"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/GetApiToken": {
            "get": {
                "tags": [
                    "User"
                ],
                "parameters": [
                    {
                        "name": "azureAdToken",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "string"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/UpsertRole": {
            "put": {
                "tags": [
                    "User"
                ],
                "requestBody": {
                    "content": {
                        "application/json-patch+json": {
                            "schema": {
                                "$ref": "#/components/schemas/Role"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Role"
                            }
                        },
                        "text/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Role"
                            }
                        },
                        "application/*+json": {
                            "schema": {
                                "$ref": "#/components/schemas/Role"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/Role"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Role"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Role"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/DeleteRole": {
            "delete": {
                "tags": [
                    "User"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "boolean"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "boolean"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/GetRoleIdIfExists": {
            "get": {
                "tags": [
                    "User"
                ],
                "parameters": [
                    {
                        "name": "roleName",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/UpsertRolesForUser": {
            "put": {
                "tags": [
                    "User"
                ],
                "requestBody": {
                    "content": {
                        "application/json-patch+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertRolesForUserRequest"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertRolesForUserRequest"
                            }
                        },
                        "text/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertRolesForUserRequest"
                            }
                        },
                        "application/*+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertRolesForUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/UpsertMessageAccessesForUser": {
            "put": {
                "tags": [
                    "User"
                ],
                "requestBody": {
                    "content": {
                        "application/json-patch+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertMessageAccessesForUserRequest"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertMessageAccessesForUserRequest"
                            }
                        },
                        "text/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertMessageAccessesForUserRequest"
                            }
                        },
                        "application/*+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertMessageAccessesForUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/UpsertResourceAccessesForUser": {
            "put": {
                "tags": [
                    "User"
                ],
                "requestBody": {
                    "content": {
                        "application/json-patch+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertResourceAccessesForUserRequest"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertResourceAccessesForUserRequest"
                            }
                        },
                        "text/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertResourceAccessesForUserRequest"
                            }
                        },
                        "application/*+json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpsertResourceAccessesForUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/VerifyUser": {
            "put": {
                "tags": [
                    "User"
                ],
                "requestBody": {
                    "content": {
                        "application/json-patch+json": {
                            "schema": {
                                "$ref": "#/components/schemas/VerifyUserRequest"
                            }
                        },
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/VerifyUserRequest"
                            }
                        },
                        "text/json": {
                            "schema": {
                                "$ref": "#/components/schemas/VerifyUserRequest"
                            }
                        },
                        "application/*+json": {
                            "schema": {
                                "$ref": "#/components/schemas/VerifyUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/GetUsersByEmailOrName": {
            "get": {
                "tags": [
                    "User"
                ],
                "parameters": [
                    {
                        "name": "emailOrNameQuery",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 0
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 30
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserQueriedResponse"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserQueriedResponse"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserQueriedResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/GetRolesByName": {
            "get": {
                "tags": [
                    "User"
                ],
                "parameters": [
                    {
                        "name": "roleName",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 0
                        }
                    },
                    {
                        "name": "size",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "default": 30
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "$ref": "#/components/schemas/RoleQueriedResponse"
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RoleQueriedResponse"
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RoleQueriedResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/User/PutDefaultRoles": {
            "put": {
                "tags": [
                    "User"
                ],
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "array",
                                    "items": {}
                                }
                            },
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {}
                                }
                            },
                            "text/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "Env": {
                "enum": [
                    0,
                    1,
                    2,
                    3
                ],
                "type": "integer",
                "format": "int32"
            },
            "Exception": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "message": {
                        "type": "string",
                        "nullable": true
                    },
                    "stackTrace": {
                        "type": "string",
                        "nullable": true
                    },
                    "type": {
                        "type": "string",
                        "nullable": true
                    },
                    "inner": {
                        "$ref": "#/components/schemas/Exception"
                    },
                    "stepData": {
                        "$ref": "#/components/schemas/StepData"
                    }
                },
                "additionalProperties": false
            },
            "HttpMethod": {
                "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "type": "integer",
                "format": "int32"
            },
            "IntegrationHistoryExtensions": {
                "type": "object",
                "properties": {
                    "inServices": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    },
                    "outServices": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "LineChartData": {
                "type": "object",
                "properties": {
                    "items": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/LineChartItem"
                        },
                        "nullable": true
                    },
                    "dates": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "date-time"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "LineChartItem": {
                "type": "object",
                "properties": {
                    "values": {
                        "type": "array",
                        "items": {
                            "type": "number",
                            "format": "double"
                        },
                        "nullable": true
                    },
                    "label": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "Message": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "guid": {
                        "type": "string",
                        "nullable": true
                    },
                    "type": {
                        "type": "string",
                        "nullable": true
                    },
                    "createdOn": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "payload": {
                        "type": "string",
                        "nullable": true
                    },
                    "payloadHash": {
                        "type": "string",
                        "nullable": true
                    },
                    "isCritical": {
                        "type": "boolean"
                    },
                    "relatedMessagesIds": {
                        "type": "string",
                        "nullable": true
                    },
                    "tags": {
                        "type": "string",
                        "nullable": true,
                        "deprecated": true
                    },
                    "tagsEntities": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Tag"
                        },
                        "nullable": true
                    },
                    "sentFrom": {
                        "type": "string",
                        "nullable": true,
                        "deprecated": true
                    },
                    "services": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Service"
                        },
                        "nullable": true
                    },
                    "messageReferences": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageReference"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "MessageDto": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "guid": {
                        "type": "string",
                        "nullable": true
                    },
                    "type": {
                        "type": "string",
                        "nullable": true
                    },
                    "sentFrom": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    },
                    "createdOn": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "payload": {
                        "type": "string",
                        "nullable": true
                    },
                    "isCritical": {
                        "type": "boolean"
                    },
                    "relatedMessagesIds": {
                        "type": "string",
                        "nullable": true
                    },
                    "tags": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    },
                    "messageReferences": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageReferenceDto"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "MessageReference": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "category": {
                        "type": "string",
                        "nullable": true
                    },
                    "isIncoming": {
                        "type": "boolean"
                    },
                    "isOutgoing": {
                        "type": "boolean"
                    },
                    "reference": {
                        "type": "string",
                        "nullable": true
                    },
                    "stepData": {
                        "$ref": "#/components/schemas/StepData"
                    },
                    "message": {
                        "$ref": "#/components/schemas/Message"
                    },
                    "messageId": {
                        "type": "integer",
                        "format": "int32",
                        "nullable": true
                    },
                    "stepDataId": {
                        "type": "integer",
                        "format": "int32",
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "MessageReferenceDto": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "nullable": true
                    },
                    "isIncoming": {
                        "type": "boolean"
                    },
                    "isOutgoing": {
                        "type": "boolean"
                    },
                    "reference": {
                        "type": "string",
                        "nullable": true
                    },
                    "stepDataId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "stepName": {
                        "type": "string",
                        "nullable": true
                    },
                    "serviceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "stepDateIn": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "messageId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "isSuccessful": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            },
            "MessageTableRow": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "guid": {
                        "type": "string",
                        "nullable": true
                    },
                    "type": {
                        "type": "string",
                        "nullable": true
                    },
                    "createdOn": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "sentFrom": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    },
                    "isSuccessful": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            },
            "MessageTableRowQueriedResponse": {
                "type": "object",
                "properties": {
                    "records": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageTableRow"
                        },
                        "nullable": true
                    },
                    "totalNumber": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                "additionalProperties": false
            },
            "MessageTypeAccess": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "messageType": {
                        "type": "string",
                        "nullable": true
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "users": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/User"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "Role": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "locked": {
                        "type": "boolean"
                    },
                    "isSuperAdmin": {
                        "type": "boolean"
                    },
                    "isAdmin": {
                        "type": "boolean"
                    },
                    "canAssignRoles": {
                        "type": "boolean"
                    },
                    "canAssignMessageAccesses": {
                        "type": "boolean"
                    },
                    "canVerifyUsers": {
                        "type": "boolean"
                    },
                    "users": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/User"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "RoleQueriedResponse": {
                "type": "object",
                "properties": {
                    "records": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Role"
                        },
                        "nullable": true
                    },
                    "totalNumber": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                "additionalProperties": false
            },
            "RunningResourceAccess": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "resourceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "users": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/User"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "Service": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "messages": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Message"
                        },
                        "nullable": true
                    },
                    "steps": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/StepData"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "ServiceWithResourceName": {
                "type": "object",
                "properties": {
                    "resource": {
                        "type": "string",
                        "nullable": true
                    },
                    "service": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "StepData": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "guid": {
                        "type": "string",
                        "nullable": true
                    },
                    "dimLogVersion": {
                        "type": "string",
                        "nullable": true
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "dateIn": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "dateOut": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "serviceName": {
                        "type": "string",
                        "nullable": true,
                        "deprecated": true
                    },
                    "service": {
                        "$ref": "#/components/schemas/Service"
                    },
                    "resourceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "triggerDetails": {
                        "$ref": "#/components/schemas/TriggerDetails"
                    },
                    "triggerDetailsId": {
                        "type": "integer",
                        "format": "int32",
                        "nullable": true
                    },
                    "exception": {
                        "$ref": "#/components/schemas/Exception"
                    },
                    "exceptionId": {
                        "type": "integer",
                        "format": "int32",
                        "nullable": true
                    },
                    "messageReferences": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageReference"
                        },
                        "nullable": true
                    },
                    "originSystem": {
                        "type": "string",
                        "nullable": true
                    },
                    "destinationSystem": {
                        "type": "string",
                        "nullable": true
                    },
                    "incomingMessage": {
                        "$ref": "#/components/schemas/Message"
                    },
                    "outgoingMessages": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Message"
                        },
                        "nullable": true,
                        "readOnly": true
                    }
                },
                "additionalProperties": false
            },
            "StepDataDto": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "invocationId": {
                        "type": "string",
                        "nullable": true
                    },
                    "env": {
                        "$ref": "#/components/schemas/Env"
                    },
                    "dimLogVersion": {
                        "type": "string",
                        "nullable": true
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "dateIn": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "dateOut": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "serviceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "resourceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "triggerDetails": {
                        "$ref": "#/components/schemas/TriggerDetails"
                    },
                    "exception": {
                        "$ref": "#/components/schemas/Exception"
                    },
                    "messageReferences": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageReferenceDto"
                        },
                        "nullable": true
                    },
                    "originSystem": {
                        "type": "string",
                        "nullable": true
                    },
                    "destinationSystem": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "StepMiniData": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "serviceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "isSuccessful": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            },
            "StepPathNode": {
                "type": "object",
                "properties": {
                    "data": {
                        "$ref": "#/components/schemas/StepMiniData"
                    },
                    "children": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/StepPathNode"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "StepTableRow": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "nullable": true
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "serviceName": {
                        "type": "string",
                        "nullable": true
                    },
                    "dateIn": {
                        "type": "string",
                        "nullable": true
                    },
                    "exceptionMessage": {
                        "type": "string",
                        "nullable": true
                    },
                    "isSuccessful": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            },
            "StepTableRowQueriedResponse": {
                "type": "object",
                "properties": {
                    "records": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/StepTableRow"
                        },
                        "nullable": true
                    },
                    "totalNumber": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                "additionalProperties": false
            },
            "Tag": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    },
                    "message": {
                        "$ref": "#/components/schemas/Message"
                    }
                },
                "additionalProperties": false
            },
            "TriggerDetails": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "stepData": {
                        "$ref": "#/components/schemas/StepData"
                    },
                    "discriminator": {
                        "$ref": "#/components/schemas/TriggerDetailsDiscriminator"
                    },
                    "body": {
                        "type": "string",
                        "nullable": true
                    },
                    "method": {
                        "$ref": "#/components/schemas/HttpMethod"
                    },
                    "route": {
                        "type": "string",
                        "nullable": true
                    },
                    "headers": {
                        "type": "object",
                        "additionalProperties": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "nullable": true
                    },
                    "cron": {
                        "type": "string",
                        "nullable": true
                    },
                    "serviceBusName": {
                        "type": "string",
                        "nullable": true
                    },
                    "topic": {
                        "type": "string",
                        "nullable": true
                    },
                    "subscription": {
                        "type": "string",
                        "nullable": true
                    },
                    "queue": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "TriggerDetailsDiscriminator": {
                "enum": [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                "type": "integer",
                "format": "int32"
            },
            "UpsertMessageAccessesForUserRequest": {
                "type": "object",
                "properties": {
                    "userId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "messageTypeAccesses": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "UpsertResourceAccessesForUserRequest": {
                "type": "object",
                "properties": {
                    "userId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "runningResourceAccesses": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "UpsertRolesForUserRequest": {
                "type": "object",
                "properties": {
                    "userId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "rolesIds": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "nullable": true
                    }
                },
                "additionalProperties": false
            },
            "User": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "ssoOid": {
                        "type": "string",
                        "nullable": true
                    },
                    "name": {
                        "type": "string",
                        "nullable": true
                    },
                    "email": {
                        "type": "string",
                        "nullable": true
                    },
                    "roles": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Role"
                        },
                        "nullable": true
                    },
                    "messageTypeAccesses": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/MessageTypeAccess"
                        },
                        "nullable": true
                    },
                    "runningResourceAccesses": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/RunningResourceAccess"
                        },
                        "nullable": true
                    },
                    "isVerified": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            },
            "UserQueriedResponse": {
                "type": "object",
                "properties": {
                    "records": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/User"
                        },
                        "nullable": true
                    },
                    "totalNumber": {
                        "type": "integer",
                        "format": "int64"
                    }
                },
                "additionalProperties": false
            },
            "VerifyUserRequest": {
                "type": "object",
                "properties": {
                    "userId": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "verify": {
                        "type": "boolean"
                    }
                },
                "additionalProperties": false
            }
        },
        "securitySchemes": {
            "API Key": {
                "type": "apiKey",
                "name": "x-api-key",
                "in": "header"
            }
        }
    },
    "security": [
        {
            "API Key": []
        }
    ]
}