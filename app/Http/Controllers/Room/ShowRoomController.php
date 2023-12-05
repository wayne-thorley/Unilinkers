<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\ShowRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;

class ShowRoomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ShowRoomRequest $request, Room $room)
    {
        $this->authorize('view', $room);

        return new RoomResource($room);
    }
}
