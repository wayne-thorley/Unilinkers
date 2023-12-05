<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Property;
use App\Models\Room;

class StoreRoomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreRoomRequest $request)
    {
        $this->authorize('create', Room::class);

        $room = Room::create($request->only([
            'property_id',
            'name',
            'size',
        ]));

        return new RoomResource($room);
    }
}
