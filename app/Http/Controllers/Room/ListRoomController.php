<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\ListRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;

class ListRoomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ListRoomRequest $request)
    {
        $this->authorize('viewAny', Room::class);

        $rooms = Room::query()
            ->when($request->input('property_id'), fn ($q, $propertyId) => $q
                ->where('property_id', '=', $propertyId)
            )
            ->paginate(20);

        return RoomResource::collection($rooms);
    }
}
