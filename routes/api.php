<?php

use App\Http\Controllers\Property\DestroyPropertyController;
use App\Http\Controllers\Property\ListPropertyController;
use App\Http\Controllers\Property\ShowPropertyController;
use App\Http\Controllers\Property\StorePropertyController;
use App\Http\Controllers\Property\UpdatePropertyController;
use App\Http\Controllers\Room\DestroyRoomController;
use App\Http\Controllers\Room\ListRoomController;
use App\Http\Controllers\Room\ShowRoomController;
use App\Http\Controllers\Room\StoreRoomController;
use App\Http\Controllers\Room\UpdateRoomController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/property')->name('property.')->group(function () {
    Route::put('/{property}', UpdatePropertyController::class)->name('update');
    Route::delete('/{property}', DestroyPropertyController::class)->name('destroy');
    Route::get('/{property}', ShowPropertyController::class)->name('show');
    Route::post('/', StorePropertyController::class)->name('store');
    Route::get('/', ListPropertyController::class)->name('list');
});

Route::prefix('/room')->name('room.')->group(function () {
    Route::put('/{room}', UpdateRoomController::class)->name('update');
    Route::delete('/{room}', DestroyRoomController::class)->name('destroy');
    Route::get('/{room}', ShowRoomController::class)->name('show');
    Route::post('/', StoreRoomController::class)->name('store');
    Route::get('/', ListRoomController::class)->name('list');
});
