<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;

class UpdateRoomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateRoomRequest $request, Room $room)
    {
        $this->authorize('update', $room);

        $room->update($request->only([
            'name',
            'size',
        ]));

        return new RoomResource($room);
    }
}
