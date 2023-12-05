<?php

namespace App\Http\Controllers\Room;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\DestroyRoomRequest;
use App\Models\Room;
use Illuminate\Http\JsonResponse;

class DestroyRoomController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(DestroyRoomRequest $request, Room $room)
    {
        $this->authorize('delete', $room);

        $room->delete();

        return new JsonResponse([], JsonResponse::HTTP_NO_CONTENT);
    }
}
