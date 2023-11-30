---
sidebar_position: 9
---

# Errors

## Salable error types

Salable throws different kinds of errors. The following lists the exception types, and their documented data fields:

### `SalableResponseError`

The Salable node SDK throws a `SalableResponseError` exception if the error is a known error.

| Property | Description                             |
| -------- | --------------------------------------- |
| `code`   | A Salable specific error code           |
| `status` | The status code of the error            |
| `data`   | Error message associated with the error |

### `SalableValidationError`

The Salable node SDK throws a `SalableValidationError` exception if the error is related validating data on the request.

| Property | Description                   |
| -------- | ----------------------------- |
| `code`   | A Salable specific error code |
| `status` | The status code of the error  |
| `data`   | An array of `ValidationError` |

### `SalableUnknownError`

The Salable node SDK throws a `SalableUnknownError` exception if the error unknown.

| Property | Description                    |
| -------- | ------------------------------ |
| `code`   | A Salable specific error code  |
| `error`  | A message related to the error |

## Salable error codes

| Code    | Description                  |
| ------- | ---------------------------- |
| `S1000` | Unauthorised access to SDK   |
| `S1001` | Object was not found         |
| `S1002` | Bad request                  |
| `S1003` | Validation error             |
| `S1004` | Unknown error in Salable API |
| `S1005` | Unknown error in Salable SDK |
